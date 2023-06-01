import { Controller, Get } from '@nestjs/common';
import { ContatoService } from './contato.service';

@Controller('contato')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Get()
  async getContato(): Promise<any[]> {
    return this.contatoService.getContato();
  }
}
