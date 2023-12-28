import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserService as User } from "../auth/user.service"
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, User]
})
export class UserModule { }
