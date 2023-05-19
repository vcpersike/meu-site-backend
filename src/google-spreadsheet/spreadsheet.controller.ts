import { Controller, Get } from '@nestjs/common';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Controller('spreadsheet')
export class SpreadsheetController {
  constructor(private readonly spreadsheetService: GoogleSpreadsheetService) {}

  @Get()
  async getData(): Promise<any[]> {
    return this.spreadsheetService.getData();
  }
}
