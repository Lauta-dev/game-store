import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  private extractTokenFromHeader(req: Request): string | undefined {
    // Esta variable tendra el typo de token como el token mismo
    const [type, token] = req.headers.authorization?.split(' ') ?? []

    // El Bearer Token: es el token con el que autoriza el usuario
    const isBearer = type === 'Bearer' ? token : undefined

    return isBearer
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: jwtConstants.secret }
      )

      req["user"] = payload
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }
}
