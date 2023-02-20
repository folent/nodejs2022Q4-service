import { Album } from "src/album/Album.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Album, '', { onDelete: 'CASCADE' })
  album: Album;
}