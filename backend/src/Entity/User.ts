import { AfterRemove, BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { GamesEntity } from "./Games";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

  // uuid del usuario, esta es la `primary key` y se genera automaticamente
  @Column({
    name: "user_id",
    type: "uuid",
    primary: true,
    default: () => "(UUID())",
    nullable: false,

  })
  userId: string

  // Username del usuario
  @Column({ name: "user_name" })
  userName: string

  // Primer nombre del usuario
  @Column({ name: "user_firs_name" })
  firtName: string

  // Apellido del usuario
  @Column({ name: "user_last_name" })
  lastName: string

  // Rol del usuario
  @Column({ name: "rol", default: () => "'user'" })
  rol: string

  // Momento que se inserto el registro en la tabla
  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  createAt: Date

  @ManyToMany(() => GamesEntity, game => game.users)
  @JoinColumn({ name: "games_users" })
  games: GamesEntity[]

}
