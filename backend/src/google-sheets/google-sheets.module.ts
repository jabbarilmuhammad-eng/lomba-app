import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service.js';

@Module({
  providers: [GoogleSheetsService],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {}