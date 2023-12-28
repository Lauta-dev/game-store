import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/User';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GamesUserEntity } from 'src/Entity/Game-user';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, GamesUserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule { }
