import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Post("/create")
  async createUser(
    @Body() body: { first_name: string, last_name: string, user_name: string },
    @Res() res: Response
  ) {
    const { first_name, last_name, user_name } = body

    // Validar si los datos son diferentes a un string (tipo texto)
    if (typeof first_name !== "string" || typeof last_name !== "string" || typeof user_name !== "string") {
      return {
        datos: "Datos invalidos"
      }
    }

    // Validar first_name
    if (first_name.length < 5) return `Su nombre (${first_name}) no es valido, debe tenér más de 5 (cinco) caracteres.`
    if (first_name.length > 50) return `Su nombre (${first_name}) no es valido, debe tenér menos de 50 (cincuenta) caracteres.`

    // Validar last_name
    if (last_name.length < 5) return `Su apellido (${last_name}) no es valido, debe tenér más de 5 (cinco) caracteres.`
    if (last_name.length > 50) return `Su apellido (${last_name}) no es valido, debe tenér menos de 50 (cincuenta) caracteres.`

    // Validar user_name
    if (user_name.length < 5) return `Su nombre de usuario (${user_name}) no es valido, debe tenér más de 5 (cinco) caracteres.`
    if (user_name.length > 25) return `Su nombre de usuario (${user_name}) no es valido, debe tenér menos de 25 (veinticinco) caracteres.`

    const user = await this.service.create({
      first_name, last_name, user_name
    })

    res.status(HttpStatus.CREATED).json(user)
  }

}
