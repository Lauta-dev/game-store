import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { UserEntity } from "./User";

/*
 *  CUIDADO!!
 *  
 *  Esto genera tablas en la base de datos
 * 
 * */

// { name: "nombre de la tabla" }
@Entity({ name: "games" })
export class GamesEntity {

  // Crear una tabla primaria que genera uuid's cuando se inserte un nuevo registro
  @Column({
    primary: true,
    generated: "uuid",
    name: "game_id",
    default: () => "(UUID())"
  })
  gameId: string

  // Nombre del juego
  @Column({
    name: "game_title",
    type: "varchar",
    unique: true
  })
  gameTitle: string

  // Generacion de consola
  @Column({
    name: "console",
    type: "varchar"
  })
  console: string

  // Año que salio
  @Column({
    name: "release_year",
    type: "date",
    nullable: true
  })
  releaseYear: Date

  // Fecha y hora de cuando se inserto el registro en la base de dato
  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date

  // Relacion de muchos a muchos, con la tabla de users
  @ManyToMany(() => UserEntity, user => user.games)
  @JoinTable({ name: "games_users", joinColumn: { name: "game_id" }, inverseJoinColumn: { name: "user_id" } })
  users: UserEntity[]
}

