import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { GoogleSheetsModule } from '../google-sheets/google-sheets.module.js';

@Module({
  imports: [GoogleSheetsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}