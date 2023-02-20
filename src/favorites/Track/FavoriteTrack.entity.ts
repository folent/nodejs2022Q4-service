import { Track } from "src/track/Track.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Track, '', { onDelete: 'CASCADE' })
  track: Track;
}