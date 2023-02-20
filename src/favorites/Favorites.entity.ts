import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('increment')
  id: number
  @Column()
  artists: string[]; // favorite artists ids
  @Column()
  albums: string[]; // favorite albums ids
  @Column()
  tracks: string[]; // favorite tracks ids
}
