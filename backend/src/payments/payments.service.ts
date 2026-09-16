import 'dotenv/config';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { db } from '../prisma/db.js';
import { AuthUser } from '../auth/auth-user.interface.js';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class PaymentsService {
  async createPayment(
    data: {
      amount: number;
      registrationId: number;
      file: any;
    },
    user: AuthUser,
  ) {
    if (!data.amount || data.amount <= 0) {
      throw new BadRequestException(
        'Jumlah pembayaran tidak valid',
      );
    }

    if (
      !data.registrationId ||
      data.registrationId <= 0
    ) {
      throw new BadRequestException(
        'registrationId tidak valid',
      );
    }

    const registrations =
      await db.orm.public.Registration.where({
        id: data.registrationId,
      }).all();

    const registration =
      registrations[0];

    if (!registration) {
      throw new NotFoundException(
        'Pendaftaran tidak ditemukan',
      );
    }

    if (registration.userId !== user.sub) {
      throw new UnauthorizedException(
        'Kamu tidak memiliki akses ke pendaftaran ini',
      );
    }

    const existingPayments =
      await db.orm.public.Payment.where({
        registrationId:
          data.registrationId,
      }).all();

    if (existingPayments.length > 0) {
      throw new BadRequestException(
        'Pendaftaran ini sudah memiliki pembayaran',
      );
    }

    if (!data.file) {
      throw new BadRequestException(
        'Bukti pembayaran wajib diupload',
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];

    if (
      !allowedMimeTypes.includes(
        data.file.mimetype,
      )
    ) {
      throw new BadRequestException(
        'Format bukti pembayaran harus JPG, JPEG, PNG, atau WEBP',
      );
    }

    if (data.file.size > 5 * 1024 * 1024) {
      throw new BadRequestException(
        'Ukuran bukti pembayaran maksimal 5 MB',
      );
    }

    const uploadResult =
      await new Promise<any>(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  'armaso/payment-proofs',
                resource_type: 'image',
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              },
            );

          uploadStream.end(
            data.file.buffer,
          );
        },
      );

    const payment =
      await db.orm.public.Payment.create({
        amount: data.amount,
        proofUrl:
          uploadResult.secure_url,
        status: 'PENDING',
        userId: user.sub,
        registrationId:
          data.registrationId,
      });

    return {
      message:
        'Bukti pembayaran berhasil diupload',

      paymentId:
        payment.id,

      registrationId:
        payment.registrationId,

      userId:
        user.sub,

      amount:
        payment.amount,

      status:
        payment.status,

      proofUrl:
        payment.proofUrl,
    };
  }

  async verifyPayment(id: number) {
    const payments =
      await db.orm.public.Payment.where({
        id,
      }).all();

    const payment =
      payments[0];

    if (!payment) {
      throw new NotFoundException(
        'Pembayaran tidak ditemukan',
      );
    }

    if (payment.status === 'VERIFIED') {
      throw new BadRequestException(
        'Pembayaran sudah diverifikasi',
      );
    }

    // Ambil data pembayaran lalu update menggunakan
    // method yang didukung ORM prisma-next.
   const updatedPayment =
      await db.orm.public.Payment
      .where({ id })
      .update({
      status: 'VERIFIED',
      });

    if (!updatedPayment) {
      throw new NotFoundException(
        'Pembayaran tidak ditemukan',
      );
    }

    return {
      message:
        'Pembayaran berhasil diverifikasi',

      paymentId:
        updatedPayment.id,

      registrationId:
        updatedPayment.registrationId,

      status:
        updatedPayment.status,
    };
  }

  async rejectPayment(id: number) {
    const payments =
      await db.orm.public.Payment.where({
        id,
      }).all();

    const payment =
      payments[0];

    if (!payment) {
      throw new NotFoundException(
        'Pembayaran tidak ditemukan',
      );
    }

    if (payment.status === 'REJECTED') {
      throw new BadRequestException(
        'Pembayaran sudah ditolak',
      );
    }

    const updatedPayment =
      await db.orm.public.Payment
      .where({ id })
      .update({
      status: 'REJECTED',
      });

    if (!updatedPayment) {
      throw new NotFoundException(
        'Pembayaran tidak ditemukan',
      );
    }

    return {
      message:
        'Pembayaran berhasil ditolak',

      paymentId:
        updatedPayment.id,

      registrationId:
        updatedPayment.registrationId,

      status:
        updatedPayment.status,
    };
  }
}