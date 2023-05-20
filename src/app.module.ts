import { Module } from '@nestjs/common';
import { ExperienciaService } from './google-spreadsheet/experiencia.service';
import { ExperienciaController } from './google-spreadsheet/experiencia.controller';

@Module({
  imports: [],
  controllers: [ExperienciaController],
  providers: [ExperienciaService],
})
export class AppModule {}
