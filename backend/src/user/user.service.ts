import { Injectable } from '@nestjs/common';
import { UserService as User } from "../auth/user.service"

@Injectable()
export class UserService {
  constructor(private user: User) { }

  async create({ first_name, last_name, user_name }) {
    return await this.user.create({
      firtName: first_name,
      lastName: last_name,
      userName: user_name
    })
  }
}
