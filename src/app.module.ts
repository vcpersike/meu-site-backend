import { Module } from '@nestjs/common';
import { ExperienciaService } from './experiencias/experiencia.service';
import { ExperienciaController } from './experiencias/experiencia.controller';
import { LinguagensService } from './linguagens/linguagens.service';
import { LinguagensController } from './linguagens/linguagens.controller';
import { ProjetosController } from './projetos/projetos.controller';
import { ProjetosService } from './projetos/projetos.service';
import { ConfigGoogleSheetsService } from './config.service';
import { ContatoController } from './contato/contato.controller';
import { ContatoService } from './contato/contato.service';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioController } from './usuario/usuario.controller';

@Module({
  imports: [],
  controllers: [
    ContatoController,
    ExperienciaController,
    LinguagensController,
    ProjetosController,
    UsuarioController,
  ],
  providers: [
    ContatoService,
    ExperienciaService,
    LinguagensService,
    ProjetosService,
    ConfigGoogleSheetsService,
    UsuarioService,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
