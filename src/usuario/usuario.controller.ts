import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioDto } from 'src/DTO/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Post()
  async createUser(@Body() createUserDto: UsuarioDto) {
    const { name, email } = createUserDto;
    return this.userService.criaUsuario(name, email);
  }
}
