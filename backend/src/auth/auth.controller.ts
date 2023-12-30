import { Body, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { userInfo } from 'src/interface/userInfo.interface';

interface Req {
  user: { exp: number, iat: number, uuid: string },
  req: Request
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Verificar el JSON WEB TOKEN del usuario
  @UseGuards(AuthGuard)
  @Get("/verify")
  async verifyJWT(@Res() res: Response, @Req() req: Req) {
    const { uuid } = req.user
    const data = await this.authService.verifyUserOnDb({ uuid })

    // Pasa por aqui si el usuario no existe
    if (!data) {
      throw new UnauthorizedException()
    }

    res.json({
      message: "authorized",
      statusCode: HttpStatus.OK,
    })
  }

  // Crear un usuario
  @Post("/create")
  async createUser(@Body() body: userInfo, @Res() res: Response) {
    const { userName, lastName, firtName } = body

    const user = await this.authService.createUser({
      userName,
      lastName,
      firtName
    })

    return res.status(HttpStatus.CREATED).json(user)
  }

  // Logear a un usuario
  @Post("/login")
  async loginUser(@Body() body: Pick<userInfo, "userName">, @Res() res: Response) {
    const { userName } = body

    if (typeof userName !== "string") {
      res.status(HttpStatus.BAD_REQUEST).json({
        msj: "Datos invalidos"
      })
      return
    }

    const user = await this.authService.login({ userName })

    res.status(HttpStatus.CREATED).json(user)
  }

  @UseGuards(AuthGuard)
  @Get("/admin")
  async admin(@Req() req: Req) {
    const { uuid } = req.user
    return this.authService.isAdmin({ userId: uuid })
  }

}
