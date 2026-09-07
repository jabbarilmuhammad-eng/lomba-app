import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import { memoryStorage } from 'multer';

import { CreatePaymentDto } from './dto/create-payment.dto.js';

import { PaymentsService } from './payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('proof', {
      storage: memoryStorage(),

      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  createPayment(
    @Body() dto: CreatePaymentDto,

    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.paymentsService.createPayment(
      dto,
      file,
    );
  }
}