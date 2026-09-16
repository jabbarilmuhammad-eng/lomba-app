import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import type { Request } from 'express';

import { PaymentsService } from './payments.service.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AdminApiGuard } from '../auth/guards/admin-api.guard.js';
import { AuthUser } from '../auth/auth-user.interface.js';

interface AuthenticatedRequest extends Request {
  user: AuthUser;
}

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Bukti pembayaran wajib diupload',
      );
    }

    return this.paymentsService.createPayment(
      {
        amount: Number(body.amount),
        registrationId: Number(body.registrationId),
        file,
      },
      req.user,
    );
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