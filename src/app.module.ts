import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencias/experiencia.service';
import { ExperienciaController } from './experiencias/experiencia.controller';
import { LinguagensService } from './linguagens/linguagens.service';
import { LinguagensController } from './linguagens/linguagens.controller';

@Module({
  imports: [],
  controllers: [ExperienciaController, LinguagensController],
  providers: [ExperienciaService, LinguagensService],
})
export class AppModule {}
