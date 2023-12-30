import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/Entity/User";
import { userInfo } from "src/interface/userInfo.interface";
import { Repository } from "typeorm";

interface a {
  error: boolean;
  user:
  | {}
  | {
    id: string;
    username: string;
    lastname: string;
    firsname: string;
    error: boolean;
  };
  msj?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) { }

  // Inserta un nuevo usuario en la tabla.
  private async createUser({ firtName, lastName, userName }: userInfo) {
    const newUser = this.userEntity.create({
      // Aqui le pongo un uuid, porque me da error si no lo pongo
      userName,
      lastName,
      firtName,
      userId: crypto.randomUUID(),
    });

    await this.userEntity.insert(newUser);
    return newUser;
  }

  async getAllUser() {
    return this.userEntity.find();
  }

  // Verifica que el usuario exista en la base de datos.
  //  - Si existe me devuelve un objeto con sus datos.
  //  - si no existe devuelve el valor null
  private async existUser({ userName }: Pick<userInfo, "userName">) {
    return await this.userEntity.findOneBy({ userName });
  }

  private async getUserInfo({
    userName,
  }: Pick<userInfo, "userName">): Promise<a> {
    const existUser = await this.existUser({ userName });

    if (!existUser) {
      return { msj: "no existe el usuario", error: true, user: {} };
    }

    const userInfo = await this.userEntity.findOne({ where: { userName } });

    return {
      error: false,
      user: {
        id: userInfo.userId,
        username: userInfo.userName,
        lastname: userInfo.lastName,
        firsname: userInfo.firtName,
      },
    };
  }

  // Se busca al usuario mediante su username
  private async searchUser({ userName }: Pick<userInfo, "userName">) {
    const existUser = await this.existUser({ userName });

    if (!existUser) {
      return {
        msj: "El usuario no existe",
        code: HttpStatus.NOT_FOUND,
      };
    }

    const user = await this.userEntity.findOne({
      where: { userName },
    });

    return {
      code: HttpStatus.OK,
      user,
    };
  }

  async verifyUserOnDb({ uuid }: { uuid: string }) {
    const user = await this.userEntity.exist({ where: { userId: uuid } });

    return user;
  }

  async loginUser({
    userName,
  }: Pick<userInfo, "userName">): Promise<{ error?: boolean; uuid?: string, rol?: string }> {
    const getUser = await this.searchUser({ userName });

    if (getUser.code === HttpStatus.NOT_FOUND) {
      return {
        error: true,
        uuid: "none",
      };
    }

    const uuid = getUser.user.userId;
    const rol = getUser.user.rol;

    return {
      error: false,
      uuid,
      rol
    };
  }

  async create({ firtName, lastName, userName }: userInfo) {
    const existUser = await this.existUser({ userName });

    if (!existUser) {
      const user = await this.createUser({ firtName, lastName, userName });

      return {
        msj: "Usuario creando",
        created: true,
        id: user.userId,
      };
    }

    return {
      msj: "Este nombre de usuario ya existe",
      username: userName,
      created: false,
      id: existUser.userId,
    };
  }


  async isAdmin({ userId }) {
    const user = await this.userEntity.find({ where: { userId } })
    if (user[0].rol !== "admin") {
      return { msj: "No tiene permitido ver está página", statusCode: HttpStatus.UNAUTHORIZED, authorized: false }
    }
    return { msj: "Tiene permitido ver está página", statusCode: HttpStatus.OK, authorized: true }
  }

}
