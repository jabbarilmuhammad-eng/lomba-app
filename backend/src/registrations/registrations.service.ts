import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

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

  async getFutsalRegistrations() {
    const registrations =
      await db.orm.public.Registration.all();

    const teams =
      await db.orm.public.Team.all();

    const payments =
      await db.orm.public.Payment.all();

    const futsalRegistrations =
      registrations.filter(
        (registration) =>
          registration.type === 'FUTSAL',
      );

    return futsalRegistrations.map(
      (registration) => {
        const team = teams.find(
          (team) =>
            team.registrationId ===
            registration.id,
        );

        const payment = payments.find(
          (payment) =>
            payment.registrationId ===
            registration.id,
        );

        return {
          registrationId:
            registration.id,

          teamId:
            team?.id ?? null,

          teamName:
            team?.name ?? '-',

          school:
            team?.school ?? '-',

          whatsapp:
            registration.whatsapp,

          paymentStatus:
            payment?.status ?? 'PENDING',

          paymentId:
            payment?.id ?? null,

          createdAt:
            registration.createdAt,
        };
      },
    );
  }

  async createScienceRegistration(
    dto: CreateScienceRegistrationDto,
  ) {
    if (
      !dto.participants ||
      dto.participants.length === 0
    ) {
      throw new BadRequestException(
        'Minimal harus ada 1 peserta',
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

    if (
      dto.type === 'COLLECTIVE' &&
      dto.participants.length > 11
    ) {
      throw new BadRequestException(
        'Pendaftaran kolektif maksimal 11 peserta',
      );
    }

    const whatsapp = dto.whatsapp.trim();

    if (!whatsapp) {
      throw new BadRequestException(
        'Nomor WhatsApp wajib diisi',
      );
    }

    // Nama pembimbing (opsional di backend; wajib diisi lewat form frontend)
    const supervisorName =
      dto.supervisorName?.trim() || null;

    const school =
      dto.participants[0].school.trim();

    const sameSchool =
      dto.participants.every(
        (participant) =>
          participant.school.trim() === school,
      );

    if (!sameSchool) {
      throw new BadRequestException(
        'Semua peserta harus berasal dari sekolah yang sama',
      );
    }

    const participantNames =
      dto.participants.map(
        (participant) =>
          participant.fullName
            .trim()
            .toLowerCase(),
      );

    const uniqueParticipants =
      new Set(participantNames);

    if (
      uniqueParticipants.size !==
      dto.participants.length
    ) {
      throw new BadRequestException(
        'Nama peserta tidak boleh sama dalam satu pendaftaran',
      );
    }

    const registration =
      await db.orm.public.Registration.create({
        type: dto.type,
        whatsapp,
        supervisorName,
        source: 'ONLINE',
      });

    for (const participant of dto.participants) {
      await db.orm.public.Participant.create({
        fullName:
          participant.fullName.trim(),

        school:
          participant.school.trim(),

        field:
          participant.field,

        registrationId:
          registration.id,
      });
    }

    return {
      message:
        'Pendaftaran Science berhasil disimpan!',

      registrationId:
        registration.id,

      totalParticipants:
        dto.participants.length,

      school,
      whatsapp,
      supervisorName,
      source: 'ONLINE',
    };
  }

  async createFutsalRegistration(
    dto: CreateFutsalRegistrationDto,
  ) {
    const teamName = dto.teamName.trim();
    const school = dto.school.trim();
    const whatsapp = dto.whatsapp.trim();

    if (!teamName || !school || !whatsapp) {
      throw new BadRequestException(
        'Nama tim, sekolah, dan WhatsApp wajib diisi',
      );
    }

    const registration =
      await db.orm.public.Registration.create({
        type: 'FUTSAL',
        whatsapp,
        source: 'ONLINE',
      });

    const team =
      await db.orm.public.Team.create({
        name: teamName,
        school,
        registrationId: registration.id,
      });

    return {
      message:
        'Pendaftaran Futsal berhasil disimpan!',

      registrationId:
        registration.id,

      teamId:
        team.id,

      teamName:
        team.name,

      school:
        team.school,

      whatsapp,

      source:
        'ONLINE',
    };
  }
}