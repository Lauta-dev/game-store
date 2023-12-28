import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from "@nestjs/jwt"
import { userInfo } from 'src/interface/userInfo.interface';

const createJwt = async (jwtService: JwtService, uuid: string): Promise<string> => {
  const jwt = await jwtService.signAsync({ uuid })
  return jwt
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userEntity: UserService
  ) { }

  async verifyUserOnDb({ uuid }: { uuid: string }) {
    const user = await this.userEntity.verifyUserOnDb({ uuid })
    return user
  }

  async createUser({ firtName, lastName, userName }: userInfo) {
    const one = await this.userEntity.create({ userName, firtName, lastName })

    if (!one.created) {
      return one
    }

    const token = await createJwt(this.jwtService, one.id)
    return { token, created: one.created }
  }

  async login({ userName }) {
    const user = await this.userEntity.loginUser({ userName })

    if (user.error) {
      return {
        exist: false,
        msj: "No existe el usuario"
      }
    }

    const token = await createJwt(this.jwtService, user.uuid)
    return { exist: true, msj: "", token, rol: user.rol }
  }

  async GetAllUser() {
    return this.userEntity.getAllUser()
  }

  async isAdmin({ userId }) {
    return await this.userEntity.isAdmin({ userId })
  }

}
