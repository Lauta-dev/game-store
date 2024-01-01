import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/User';
import { CreateHeadInTable } from 'src/utils/create-head-table';
import { Repository, FindManyOptions } from 'typeorm';

export interface RemoveUser {
  messaje: string;
  statusCode: 200 | 404;
  newUsers?: NewUsers | boolean;
}

export interface NewUsers {
  tableHead: string[];
  users: User[];
}

export interface User {
  createAt: string;
  firtName: string;
  lastName: string;
  rol: string;
  userId: string;
  userName: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) { }

  private async isAdmin(uuid: string): Promise<boolean> {
    const user = await this.userEntity.findOneBy({ userId: uuid })

    if (user === null) {
      return false
    }

    if (user.rol !== "admin") {
      return false
    }

    return true
  }

  private async existUser(uuid: string): Promise<boolean> {
    return await this.userEntity.exist({ where: { userId: uuid } })
  }

  async allUsers(uuid: string, take?: number) {
    if (!await this.isAdmin(uuid)) {
      return false
    }

    const findOpt: FindManyOptions<UserEntity> = {
      select: {
        userId: true,
        userName: true,
        firtName: true,
        lastName: true,
        rol: true,
        createAt: true
      },

      // Sentencia LIMIT de SQL
      take: take ? 5 + take : 5
    }

    const users = await this.userEntity.find(findOpt)

    const newUsers = users.map(data => ({
      ...data,
      createAt: new Date(data.createAt).toLocaleDateString("es-AR", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    }))

    const head = CreateHeadInTable(newUsers)

    return {
      users: newUsers.filter(data => data.userId !== uuid),
      tableHead: head
    }

  }

  async removeUser(uuid: string, adminId: string): Promise<RemoveUser> {
    const exist = await this.existUser(uuid)

    if (!exist) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        messaje: "Usuario no encontrado"
      }
    }

    await this.userEntity
      .createQueryBuilder()
      .delete()
      .where("user_id = :uuid", { uuid })
      .execute();

    return {
      statusCode: HttpStatus.OK,
      messaje: "Todo con exito",
      newUsers: await this.allUsers(adminId)
    }

  }

}

