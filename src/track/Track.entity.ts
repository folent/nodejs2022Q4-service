import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "../album/Album.entity";
import { Artist } from "../artist/Artist.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({
    nullable: false,
    type: 'varchar'
  })
  name: string;

  @Column({
    nullable: true
  })
  artistId: string | null; // refers to Artist

  // @Column({
  //   nullable: false
  // })
  // @ManyToOne(type => Artist, artist => artist.id, { eager: false })
  //    @JoinColumn()
  //    artist: Artist;

  @Column({
    nullable: true
  })
  albumId: string | null; // refers to Album

  // @ManyToMany(type => Album, album => album.id, { eager: false })
  //   @Column({
  //     nullable: false
  //   })
  //   @JoinColumn()
  //   album: Album;

  @Column({
    nullable: false,
    type: 'int'
  })
  duration: number; // integer number
}