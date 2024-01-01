import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserService as User } from "../auth/user.service"
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/User';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' }
    })
  ],
  controllers: [UserController],
  providers: [UserService, User]
})
export class UserModule { }
