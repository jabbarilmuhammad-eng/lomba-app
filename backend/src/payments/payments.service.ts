import 'dotenv/config';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { db } from '../prisma/db.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SCIENCE_PRICE = 35000;
const FUTSAL_PRICE = 150000;

@Injectable()
export class PaymentsService {
  // Daftar pembayaran untuk halaman verifikasi admin
  async getPayments() {
    const payments = await db.orm.public.Payment.all();
    const registrations = await db.orm.public.Registration.all();
    const participants = await db.orm.public.Participant.all();
    const teams = await db.orm.public.Team.all();

    const result = payments.map((payment) => {
      const registration = registrations.find(
        (item) => item.id === payment.registrationId,
      );

      const registrationParticipants = participants.filter(
        (item) => item.registrationId === payment.registrationId,
      );

      const team = teams.find(
        (item) => item.registrationId === payment.registrationId,
      );

      const firstParticipant = registrationParticipants[0];

      return {
        id: payment.id,
        paymentId: payment.id,
        registrationId: payment.registrationId,

        type: registration?.type ?? '-',
        whatsapp: registration?.whatsapp ?? '-',
        source: registration?.source ?? '-',

        name:
          team?.name ??
          firstParticipant?.fullName ??
          '-',

        school:
          team?.school ??
          firstParticipant?.school ??
          '-',

        field: firstParticipant?.field ?? null,

        participants: registrationParticipants.map((item) => ({
          fullName: item.fullName,
          school: item.school,
          field: item.field,
        })),

        amount: payment.amount,
        proofUrl: payment.proofUrl,
        status: payment.status,
        paymentMethod: payment.paymentMethod,

        createdAt: registration?.createdAt ?? null,
      };
    });

    // terbaru di atas
    return result.sort((a, b) => b.paymentId - a.paymentId);
  }

  async createPayment(data: {
    registrationId: number;
    whatsapp: string;
    file: any;
  }) {
    if (!data.registrationId || data.registrationId <= 0) {
      throw new BadRequestException('registrationId tidak valid');
    }

    const whatsapp = String(data.whatsapp || '').trim();

    if (!whatsapp) {
      throw new BadRequestException('Nomor WhatsApp wajib diisi');
    }

    const registrations =
      await db.orm.public.Registration.where({
        id: data.registrationId,
      }).all();

    const registration = registrations[0];

    if (!registration) {
      throw new NotFoundException('Pendaftaran tidak ditemukan');
    }

    if (registration.source !== 'ONLINE') {
      throw new BadRequestException(
        'Pembayaran online hanya berlaku untuk pendaftaran online',
      );
    }

    if (registration.whatsapp !== whatsapp) {
      throw new BadRequestException(
        'Nomor WhatsApp tidak sesuai dengan data pendaftaran',
      );
    }

    const existingPayments =
      await db.orm.public.Payment.where({
        registrationId: data.registrationId,
      }).all();

    if (existingPayments.length > 0) {
      throw new BadRequestException(
        'Pendaftaran ini sudah memiliki pembayaran',
      );
    }

    if (!data.file) {
      throw new BadRequestException('Bukti pembayaran wajib diupload');
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];

    if (!allowedMimeTypes.includes(data.file.mimetype)) {
      throw new BadRequestException(
        'Format bukti pembayaran harus JPG, JPEG, PNG, atau WEBP',
      );
    }

    if (data.file.size > 5 * 1024 * 1024) {
      throw new BadRequestException(
        'Ukuran bukti pembayaran maksimal 5 MB',
      );
    }

    let amount: number;

    if (registration.type === 'SELF' || registration.type === 'COLLECTIVE') {
      const participants =
        await db.orm.public.Participant.where({
          registrationId: data.registrationId,
        }).all();

      const participantCount = participants.length;

      if (participantCount < 1 || participantCount > 11) {
        throw new BadRequestException(
          'Jumlah peserta pendaftaran tidak valid',
        );
      }

      const freeParticipants = Math.floor(participantCount / 11);

      amount =
        (participantCount - freeParticipants) * SCIENCE_PRICE;
    } else if (registration.type === 'FUTSAL') {
      amount = FUTSAL_PRICE;
    } else {
      throw new BadRequestException(
        'Jenis pendaftaran tidak valid',
      );
    }

    const uploadResult = await new Promise<any>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'armaso/payment-proofs',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (!result) {
              reject(new Error('Upload bukti pembayaran gagal'));
            } else {
              resolve(result);
            }
          },
        );

        uploadStream.end(data.file.buffer);
      },
    );

    const payment = await db.orm.public.Payment.create({
      amount,
      proofUrl: uploadResult.secure_url,
      status: 'PENDING',
      paymentMethod: 'ONLINE',
      userId: null,
      registrationId: data.registrationId,
    });

    return {
      message: 'Bukti pembayaran berhasil diupload',
      paymentId: payment.id,
      registrationId: payment.registrationId,
      amount: payment.amount,
      status: payment.status,
      proofUrl: payment.proofUrl,
    };
  }

  async verifyPayment(id: number) {
    const payments = await db.orm.public.Payment.where({
      id,
    }).all();

    const payment = payments[0];

    if (!payment) {
      throw new NotFoundException('Pembayaran tidak ditemukan');
    }

    if (payment.status === 'VERIFIED') {
      throw new BadRequestException(
        'Pembayaran sudah diverifikasi',
      );
    }

    const updatedPayment =
      await db.orm.public.Payment.where({ id }).update({
        status: 'VERIFIED',
      });

    if (!updatedPayment) {
      throw new NotFoundException('Pembayaran tidak ditemukan');
    }

    return {
      message: 'Pembayaran berhasil diverifikasi',
      paymentId: updatedPayment.id,
      registrationId: updatedPayment.registrationId,
      status: updatedPayment.status,
    };
  }

  async rejectPayment(id: number) {
    const payments = await db.orm.public.Payment.where({
      id,
    }).all();

    const payment = payments[0];

    if (!payment) {
      throw new NotFoundException('Pembayaran tidak ditemukan');
    }

    if (payment.status === 'REJECTED') {
      throw new BadRequestException(
        'Pembayaran sudah ditolak',
      );
    }

    const updatedPayment =
      await db.orm.public.Payment.where({ id }).update({
        status: 'REJECTED',
      });

    if (!updatedPayment) {
      throw new NotFoundException('Pembayaran tidak ditemukan');
    }

    return {
      message: 'Pembayaran berhasil ditolak',
      paymentId: updatedPayment.id,
      registrationId: updatedPayment.registrationId,
      status: updatedPayment.status,
    };
  }
}