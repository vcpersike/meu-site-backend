import { Controller, Get } from '@nestjs/common';
import { LinguagensService } from './linguagens.service';

@Controller('linguagens')
export class LinguagensController {
  constructor(private readonly linguagensService: LinguagensService) {}

  @Get()
  async getLinguagens(): Promise<any[]> {
    return this.linguagensService.getLinguagens();
  }
}
