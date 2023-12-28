import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { GamesUserEntity } from "src/Entity/Game-user";
import { GamesEntity } from "src/Entity/Games";
import { UserEntity } from "src/Entity/User";

@Injectable()
export class TypeORMConfigService {
  constructor(private config: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.config.get<string>("HOST"),
      port: this.config.get<number>("PORT"),
      username: this.config.get<string>("USERNAME"),
      password: this.config.get<string>("PASSWORD"),
      database: this.config.get<string>("PASSWORD"),
      entities: [UserEntity, GamesEntity, GamesUserEntity],
      synchronize: true,
    }
  }

}

