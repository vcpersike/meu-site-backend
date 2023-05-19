import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleSpreadsheetService } from './google-spreadsheet/google-spreadsheet.service';
import { SpreadsheetController } from './google-spreadsheet/spreadsheet.controller';

@Module({
  imports: [],
  controllers: [AppController, SpreadsheetController],
  providers: [AppService, GoogleSpreadsheetService],
})
export class AppModule {}
