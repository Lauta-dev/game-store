import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesEntity } from 'src/Entity/Games';
import { UserEntity } from 'src/Entity/User';
import { GamesUserEntity } from 'src/Entity/Game-user';

@Module({
  imports: [TypeOrmModule.forFeature([GamesEntity, UserEntity, GamesUserEntity])],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule { }
