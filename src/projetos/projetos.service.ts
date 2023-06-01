import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { ConfigGoogleSheetsService, credenciais } from '../config.service';

@Injectable()
export class ProjetosService {
  private projetosSheet: GoogleSpreadsheetWorksheet;

  constructor(private googleSheetsService: ConfigGoogleSheetsService) {
    this.projetosSheet = null;
  }

  async getProjetos(): Promise<any[]> {
    await this.googleSheetsService.useServiceAccountAuthExperiencias();
    await this.googleSheetsService.loadSpreadsheetExperiencias();

    this.projetosSheet = this.googleSheetsService.getSheetByTitleExperiencias(
      credenciais.SPREADSHEET_TAB_PROJETOS,
    );

    const projetosSheetRows = await this.projetosSheet.getRows();

    const columnValues = projetosSheetRows.map((row) => ({
      nome: row.nome,
      descricao: row.descricao,
      tecnologias: row.tecnologias,
      tempo: row.tempo,
    }));

    const combinedData = [...columnValues];
    return combinedData;
  }
}
