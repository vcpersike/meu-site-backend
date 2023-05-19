import { Module } from '@nestjs/common';
import { GoogleSpreadsheetService } from './google-spreadsheet/google-spreadsheet.service';
import { SpreadsheetController } from './google-spreadsheet/spreadsheet.controller';

@Module({
  imports: [],
  controllers: [SpreadsheetController],
  providers: [GoogleSpreadsheetService],
})
export class AppModule {}
