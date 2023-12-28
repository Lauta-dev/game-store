import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User";
import { GamesEntity } from "./Games";

@Entity({ name: "user_games" })
export class GamesUserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", name: 'game_id', length: 36, primary: false })
  gameId: string;

  @Column({ type: "varchar", name: 'user_id', length: 36, primary: false })
  userId: string;

  @ManyToOne(() => GamesEntity, g => g.users)
  @JoinColumn({
    name: "game_id",
  })
  game: GamesEntity

  @ManyToOne(() => UserEntity, u => u.games)
  @JoinColumn({
    name: "user_id",
  })
  user: UserEntity

}

