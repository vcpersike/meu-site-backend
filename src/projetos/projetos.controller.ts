import { Controller, Get } from '@nestjs/common';
import { ProjetosService } from './projetos.service';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get()
  async getProjetos(): Promise<any[]> {
    return this.projetosService.getProjetos();
  }
}
