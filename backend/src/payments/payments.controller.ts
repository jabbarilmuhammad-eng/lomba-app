import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { PaymentsService } from './payments.service.js';
import { AdminApiGuard } from '../auth/guards/admin-api.guard.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  // Daftar semua pembayaran untuk halaman verifikasi admin
  @Get()
  @UseGuards(AdminApiGuard)
  getPayments() {
    return this.paymentsService.getPayments();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('proof', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async createPayment(
    @UploadedFile() file: any,
    @Body() body: any,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Bukti pembayaran wajib diupload',
      );
    }

    return this.paymentsService.createPayment({
      registrationId: Number(body.registrationId),
      whatsapp: String(body.whatsapp || ''),
      file,
    });
  }

  @Patch(':id/verify')
  @UseGuards(AdminApiGuard)
  verifyPayment(@Param('id') id: string) {
    return this.paymentsService.verifyPayment(
      Number(id),
    );
  }

  @Patch(':id/reject')
  @UseGuards(AdminApiGuard)
  rejectPayment(@Param('id') id: string) {
    return this.paymentsService.rejectPayment(
      Number(id),
    );
  }
}