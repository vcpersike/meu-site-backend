import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { ConfigGoogleSheetsService, credenciais } from '../config.service';

@Injectable()
export class ContatoService {
  private contatoSheet: GoogleSpreadsheetWorksheet;

  constructor(private googleSheetsService: ConfigGoogleSheetsService) {
    this.contatoSheet = null;
  }

  async getContato(): Promise<any[]> {
    await this.googleSheetsService.useServiceAccountAuthExperiencias();
    await this.googleSheetsService.loadSpreadsheetExperiencias();

    this.contatoSheet = this.googleSheetsService.getSheetByTitleExperiencias(
      credenciais.SPREADSHEET_TAB_CONTATO,
    );

    const contatoSheetRows = await this.contatoSheet.getRows();

    const columnValues = contatoSheetRows.map((row) => ({
      fone: row.fone,
      email: row.email,
      github: row.github,
      linkedin: row.linkedin,
    }));

    const combinedData = [...columnValues];
    return combinedData;
  }
}
