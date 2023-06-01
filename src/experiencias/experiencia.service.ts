import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { ConfigGoogleSheetsService, credenciais } from '../config.service';

@Injectable()
export class ExperienciaService {
  private experienciasSheet: GoogleSpreadsheetWorksheet;

  constructor(private googleSheetsService: ConfigGoogleSheetsService) {
    this.experienciasSheet = null;
  }

  async getExperiencia(): Promise<any[]> {
    await this.googleSheetsService.useServiceAccountAuthExperiencias();
    await this.googleSheetsService.loadSpreadsheetExperiencias();

    this.experienciasSheet =
      this.googleSheetsService.getSheetByTitleExperiencias(
        credenciais.SPREADSHEET_TAB_EXPERIENCIAS,
      );

    const lingaguensSheetRows = await this.experienciasSheet.getRows();

    const combinedData = [...lingaguensSheetRows.map((row) => row._rawData)];
    return combinedData;
  }
}
