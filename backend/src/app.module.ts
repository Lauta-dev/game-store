import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RequestsMiddleware } from './middlaware/requests/requests.middleware';
import { RootController } from './root/root.controller';
import { RootService } from './root/root.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/User';
import { GameModule } from './game/game.module';
import { GamesEntity } from './Entity/Games';
import { GamesUserEntity } from './Entity/Game-user';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'items',
      entities: [UserEntity, GamesEntity, GamesUserEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.db'],
    }),
    AuthModule,
    GameModule,
    UserModule,
  ],

  controllers: [RootController],
  providers: [RootService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestsMiddleware)
      .forRoutes("*")
  }
}
