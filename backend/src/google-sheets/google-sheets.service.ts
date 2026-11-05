import 'dotenv/config';
import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);

  private sheets = google.sheets({
    version: 'v4',
    auth: new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  });

  async appendRows(tab: string, rows: (string | number)[][]): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: `'${tab}'!A:K`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: rows },
      });
    } catch (err) {
      // Verifikasi pembayaran tidak boleh gagal hanya karena Sheets error
      this.logger.error(`Gagal menulis ke tab ${tab}`, err as Error);
    }
  }
}