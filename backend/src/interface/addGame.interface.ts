import { Request } from 'express'

// Se obtiene los metodos de la Request de express y se añade el user
export interface UserReq extends Request {
  user: {
    lastname: string;
    firstname: string;
    username: string;
    uuid: string;
    iat: number;
    exp: number;
  }
}

export interface addGame {
  userId: string
  gameId: string
}


export interface BodyAddGame {
  game_id: string
}
