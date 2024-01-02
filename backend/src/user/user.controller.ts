import { Get, Req, Controller, UseGuards, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithJWTInfo } from 'src/interface/Request.interface';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }

  /* Obtener todos los usuarios */
  @UseGuards(AuthGuard)
  @Get("/all/:take")
  async all(
    @Req() req: RequestWithJWTInfo,
    @Param() param: { take: number }  
  ) {
    const { uuid } = req.user
    return await this.service.allUsers(uuid, param.take)
  }

  @UseGuards(AuthGuard)
  @Get("/all")
  async a(
    @Req() req: RequestWithJWTInfo,
    @Param() param: { take: number }  
  ) {
    const { uuid } = req.user
    return await this.service.allUsers(uuid, param.take)
  }

  /* Eliminar un usuario */
  @UseGuards(AuthGuard)
  @Delete("/delete")
  async removeUser(
    @Body() body: { userId: string },
    @Req() req: RequestWithJWTInfo
  ) {
    const adminId = req.user.uuid

    return this.service.removeUser(body.userId, adminId)
  }
}
