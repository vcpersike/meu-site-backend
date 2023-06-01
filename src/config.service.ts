import { Injectable } from '@nestjs/common';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import * as fs from 'fs';
import { resolve } from 'path';

const docFile = fs.readFileSync(
  resolve(__dirname, '../config/credenciais.json'),
  {
    encoding: 'utf-8',
  },
);

export const credenciais = JSON.parse(docFile);

@Injectable()
export class ConfigGoogleSheetsService {
  private docLinguagens: GoogleSpreadsheet;
  private docExperiencias: GoogleSpreadsheet;

  constructor() {
    this.docLinguagens = new GoogleSpreadsheet(
      credenciais.SPREADSHEET_ID_LINGUAGENS,
    );
    this.docExperiencias = new GoogleSpreadsheet(
      credenciais.SPREADSHEET_ID_EXPERIENCIAS,
    );
  }

  async useServiceAccountAuthExperiencias(): Promise<void> {
    await this.docExperiencias.useServiceAccountAuth({
      client_email: credenciais.client_email,
      private_key: credenciais.private_key,
    });
  }

  async useServiceAccountAuthLinguagens(): Promise<void> {
    await this.docLinguagens.useServiceAccountAuth({
      client_email: credenciais.client_email,
      private_key: credenciais.private_key,
    });
  }
  async loadSpreadsheetExperiencias(): Promise<void> {
    await this.docExperiencias.loadInfo();
  }

  async loadSpreadsheetLinguagens(): Promise<void> {
    await this.docLinguagens.loadInfo();
  }

  getSheetByTitleExperiencias(title: string): GoogleSpreadsheetWorksheet {
    return this.docExperiencias.sheetsByTitle[title];
  }

  getSheetByTitleLinguagens(title: string): GoogleSpreadsheetWorksheet {
    return this.docLinguagens.sheetsByTitle[title];
  }
}
