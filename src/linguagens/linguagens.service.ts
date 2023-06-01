import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { ConfigGoogleSheetsService, credenciais } from '../config.service';

@Injectable()
export class LinguagensService {
  private linguagensSheet: GoogleSpreadsheetWorksheet;

  constructor(private googleSheetsService: ConfigGoogleSheetsService) {
    this.linguagensSheet = null;
  }

  async getLinguagens(): Promise<any[]> {
    await this.googleSheetsService.useServiceAccountAuthExperiencias();
    await this.googleSheetsService.loadSpreadsheetExperiencias();

    this.linguagensSheet = this.googleSheetsService.getSheetByTitleExperiencias(
      credenciais.SPREADSHEET_TAB_LINGUAGENS,
    );

    const lingaguensSheetRows = await this.linguagensSheet.getRows();

    const combinedData = [...lingaguensSheetRows.map((row) => row._rawData)];
    return combinedData;
  }
}
