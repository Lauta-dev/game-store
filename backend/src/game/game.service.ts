import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesUserEntity } from 'src/Entity/Game-user';
import { GamesEntity } from 'src/Entity/Games';
import { addGame } from 'src/interface/addGame.interface';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GamesEntity)
    private readonly gamesEntity: Repository<GamesEntity>,

    @InjectRepository(GamesUserEntity)
    private readonly gameUserEntiry: Repository<GamesUserEntity>,
  ) { }

  /*
   * # Listar todos los juegos
   *
   * */
  async listAllGame() {
    const games = await this.gamesEntity.find()

    return games
  }

  /*
   * # Se obtienen los juegos del usuario que este logeado
   *
   * Esto realizara un JOIN en la base de datos y devolvera un Array con los datos si es que hay,
   * de lo contrario devuelve un Array vacio.
   *
   */
  async listXUser({ userId }: Pick<addGame, "userId">) {
    const select = `
          games.game_title AS gameTitle,
          games.console AS console,
          games.release_year AS releaseYear,
          games.game_id AS gameId,

          users.user_name AS UserName
`

    try {
      return await this
        .gameUserEntiry
        .createQueryBuilder("user_games")
        .select(select)
        .innerJoin("user_games.user", "users", "user_games.user_id = users.user_id")
        .innerJoin("user_games.game", "games", "user_games.game_id = games.game_id")
        .where("user_games.user_id = :userId", { userId })
        .getRawMany()
    } catch (error) {
      return {
        error
      }
    }
  }


  /*
   * # Añadir un nuevo juegos que eligio el usuario
   *
   * El [gameId] se obtiene desde el frontend
   * El [userId] se obtiene desde el JWT
   * El [id] se genera desde un crypto.randomUUID()
   *
   * TODO: Verificar que el juegos no exista para el usuario que esta guardando, evitando que haya duplicados
   */
  async addGame({ gameId, userId }: addGame) {
    const existThisGame = await this.gameUserEntiry.find({ where: { gameId, userId } })

    if (existThisGame.length > 0) {
      return
    }

    const newGame = this.gameUserEntiry.create({
      userId,
      gameId,
      id: crypto.randomUUID()
    })

    await this.gameUserEntiry.save(newGame)
  }

  /*
   * # Eliminar juegos que el usuario elija
   * 
   *
   */
  async removeGame({ gameId, userId }: addGame) {
    const removeGame = await this.gameUserEntiry
      .createQueryBuilder()
      .delete()
      .where("game_id = :gameId AND user_id = :userId", { gameId, userId })
      .execute();

    // Si las columnas afectadas son igual a 0, se retorna un error
    if (removeGame.affected === 0) {
      return {
        code: HttpStatus.NOT_FOUND,
        msj: "No existe el juego"
      }
    }

    // Se obtiene otra lista con los juegos displonibles del usuario
    const newListOfGames = await this.listXUser({ userId })

    return {
      code: HttpStatus.OK,
      games: newListOfGames
    }
  }
}
