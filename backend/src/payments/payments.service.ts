import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

import { db } from '../prisma/db.js';

import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async createPayment(
    dto: CreatePaymentDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Bukti pembayaran wajib diupload',
      );
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Format foto harus JPG, JPEG, PNG, atau WEBP',
      );
    }

    const amount = Number(dto.amount);

    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException(
        'Jumlah pembayaran tidak valid',
      );
    }

    const registrationId = Number(dto.registrationId);

    if (
      isNaN(registrationId) ||
      registrationId <= 0
    ) {
      throw new BadRequestException(
        'Registration ID tidak valid',
      );
    }

    const registration =
      await db.orm.public.Registration.first({
        id: registrationId,
      });

    if (!registration) {
      throw new BadRequestException(
        'Pendaftaran tidak ditemukan',
      );
    }

    const existingPayment =
      await db.orm.public.Payment.first({
        registrationId,
      });

    if (existingPayment) {
      throw new BadRequestException(
        'Pendaftaran ini sudah memiliki pembayaran',
      );
    }

    const uploadResult = await new Promise<any>(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: 'lomba-app/payment-proofs',
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

        uploadStream.end(file.buffer);
      },
    );

    const payment =
      await db.orm.public.Payment.create({
        amount,
        proofUrl: uploadResult.secure_url,
        userId: registration.userId,
        registrationId,
      });

    return {
      message: 'Pembayaran berhasil dikirim!',
      paymentId: payment.id,
      registrationId,
      amount: payment.amount,
      proofUrl: payment.proofUrl,
      status: payment.status,
    };
  }
}