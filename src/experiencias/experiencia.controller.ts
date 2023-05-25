import { Controller, Get } from '@nestjs/common';
import { ExperienciaService } from './experiencia.service';

@Controller('experiencias')
export class ExperienciaController {
  constructor(private readonly experienciaService: ExperienciaService) {}

  @Get()
  async getExperiencias(): Promise<any[]> {
    return this.experienciaService.getExperiencia();
  }
}
