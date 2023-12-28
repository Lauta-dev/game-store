import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { UserEntity } from 'src/Entity/User';
import { GamesUserEntity } from 'src/Entity/Game-user';
import { GamesEntity } from 'src/Entity/Games';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { UserService } from 'src/auth/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [RootController],
  providers: [RootService, GameService, UserService]
})
export class RootModule { }
