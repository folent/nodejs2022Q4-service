import { Album } from "src/album/Album.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Album, { onDelete: 'CASCADE' })
  album: Album;

  @Column()
  albumId: string
}