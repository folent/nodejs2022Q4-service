import { Artist } from "src/artist/Artist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  artist: Artist;
  
  @Column()
  artistId: string
}