import { Artist } from "src/artist/Artist.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Artist, '', { onDelete: 'CASCADE' })
  artist: Artist;
}