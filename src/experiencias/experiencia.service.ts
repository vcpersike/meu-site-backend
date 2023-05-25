import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
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
export class ExperienciaService {
  private doc: GoogleSpreadsheet;

  constructor() {
    this.doc = new GoogleSpreadsheet(credenciais.SPREADSHEET_ID_EXPERIENCIAS);
  }

  async getExperiencia(): Promise<any[]> {
    await this.doc.useServiceAccountAuth({
      client_email: credenciais.client_email,
      private_key: credenciais.private_key,
    });

    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return rows.map((row) => row._rawData);
  }
}
