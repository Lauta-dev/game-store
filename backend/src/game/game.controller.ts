import { Body, Controller, Delete, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserReq } from 'src/interface/addGame.interface';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  /*
   * # Esto representa la raiz (/) de la api
   * Recupera todas los juegos
   */
  @Get()
  getAllGame() {
    return this.gameService.listAllGame()
  }

  /*
   * # Aqui se obtiene los juegos dependiendo del usuario.
   * Este id del usuario se obtiene con el JWT, si no tiene acceso, dara un error 401 de que no tiene autorización
   */
  @UseGuards(AuthGuard)
  @Get("/one")
  async gola(@Request() req: UserReq) {
    const { uuid } = req.user // <- Id del usuario
    const data = await this.gameService.listXUser({ userId: uuid })

    return data
  }

  /*
   * # Aqui se guarda el juego en una tabla de la base de datos
   * El [id del usuario] se obtiene desde el frontend y el [id del usuario] desde el JWT
   */
  @UseGuards(AuthGuard)
  @Post("/save")
  async game(@Request() req: UserReq, @Body() body: { gameId: string }) {
    const { gameId } = body   // <- Se obtiene el id del juego
    const { uuid } = req.user // <- Se obtiene el id del usuario

    await this.gameService.addGame({ userId: uuid, gameId })
  }

  /*
   * # Eliminar juego que no quiera el usuario
   * El id del juego se obtiene desde el frontend y el id el usuario desde el JWT
   */

  @UseGuards(AuthGuard)
  @Delete("/remove")
  async remove(@Req() req: UserReq, @Body() body: { gameId: string }) {
    const { uuid } = req.user

    return await this.gameService.removeGame({ userId: uuid, gameId: body.gameId })

  }

}

