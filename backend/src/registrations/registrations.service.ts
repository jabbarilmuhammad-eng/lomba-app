import { BadRequestException, Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CreateScienceRegistrationDto } from './dto/create-science-registration.dto.js';
import { CreateFutsalRegistrationDto } from './dto/create-futsal-registration.dto.js';

@Injectable()
export class RegistrationsService {
  getRegistrations() {
    return {
      message: 'Registrations API berjalan!',
    };
  }

  async createScienceRegistration(
    dto: CreateScienceRegistrationDto,
  ) {
    if (dto.participants.length === 0) {
      throw new BadRequestException(
        'Minimal harus ada 1 peserta',
      );
    }

    if (dto.participants.length > 8) {
      throw new BadRequestException(
        'Maksimal 8 peserta untuk pendaftaran Science',
      );
    }

    if (
      dto.type === 'SELF' &&
      dto.participants.length !== 1
    ) {
      throw new BadRequestException(
        'Pendaftaran SELF hanya boleh 1 peserta',
      );
    }

    const school = dto.participants[0].school;

    const sameSchool = dto.participants.every(
      (participant) => participant.school === school,
    );

    if (!sameSchool) {
      throw new BadRequestException(
        'Semua peserta harus berasal dari sekolah yang sama',
      );
    }

    const participantNames = dto.participants.map(
      (participant) =>
        participant.fullName.trim().toLowerCase(),
    );

    const uniqueParticipants = new Set(participantNames);

    if (
      uniqueParticipants.size !== dto.participants.length
    ) {
      throw new BadRequestException(
        'Nama peserta tidak boleh sama dalam satu pendaftaran',
      );
    }

    const registration =
      await db.orm.public.Registration.create({
        type: dto.type,
        userId: 1,
      });

    for (const participant of dto.participants) {
      await db.orm.public.Participant.create({
        fullName: participant.fullName.trim(),
        school: participant.school.trim(),
        field: participant.field,
        registrationId: registration.id,
      });
    }

    return {
      message: 'Pendaftaran Science berhasil disimpan!',
      registrationId: registration.id,
      totalParticipants: dto.participants.length,
      school,
    };
  }

  async createFutsalRegistration(
    dto: CreateFutsalRegistrationDto,
  ) {
    if (dto.members.length === 0) {
      throw new BadRequestException(
        'Minimal harus ada 1 anggota tim',
      );
    }

    const memberNames = dto.members.map(
      (member) => member.trim().toLowerCase(),
    );

    const uniqueMembers = new Set(memberNames);

    if (uniqueMembers.size !== dto.members.length) {
      throw new BadRequestException(
        'Nama anggota tidak boleh sama dalam satu tim',
      );
    }

    const registration =
      await db.orm.public.Registration.create({
        type: 'FUTSAL',
        userId: 1,
      });

    const team =
      await db.orm.public.Team.create({
        name: dto.teamName.trim(),
        school: dto.school.trim(),
        registrationId: registration.id,
      });

    for (const member of dto.members) {
      await db.orm.public.TeamMember.create({
        fullName: member.trim(),
        teamId: team.id,
      });
    }

    return {
      message: 'Pendaftaran Futsal berhasil disimpan!',
      registrationId: registration.id,
      teamId: team.id,
      teamName: team.name,
      totalMembers: dto.members.length,
    };
  }
}