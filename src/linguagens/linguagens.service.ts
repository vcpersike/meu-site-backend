import { Injectable } from '@nestjs/common';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import * as fs from 'fs';
import { resolve } from 'path';

const docFile = fs.readFileSync(
  resolve(__dirname, '../../config/credenciais.json'),
  {
    encoding: 'utf-8',
  },
);

const credenciais = JSON.parse(docFile);

@Injectable()
export class LinguagensService {
  private doc: GoogleSpreadsheet;
  private firstSheet: GoogleSpreadsheetWorksheet;
  private secondSheet: GoogleSpreadsheetWorksheet;

  constructor() {
    this.doc = new GoogleSpreadsheet(credenciais.SPREADSHEET_ID_LINGUAGENS);
    this.firstSheet = null;
    this.secondSheet = null;
  }

  async getLinguagens(): Promise<any[]> {
    await this.doc.useServiceAccountAuth({
      client_email: credenciais.client_email,
      private_key: credenciais.private_key,
    });

    await this.doc.loadInfo();

    this.firstSheet = this.doc.sheetsByTitle['LINGUAGENS'];
    this.secondSheet = this.doc.sheetsByTitle['PROJETOS'];

    const firstSheetRows = await this.firstSheet.getRows();
    const secondSheetRows = await this.secondSheet.getRows();

    const columnValues = secondSheetRows.map((row) => ({
      nome: row.nome,
      descricao: row.descricao,
      teste: row.tempo,
    }));

    // Realize qualquer manipulação de dados necessária
    // Combine ou organize as informações das duas abas conforme necessário

    // Exemplo: retornar os dados brutos de ambas as abas
    const combinedData = [
      ...firstSheetRows.map((row) => row._rawData),
      ...columnValues,
    ];
    return combinedData;
  }
}
