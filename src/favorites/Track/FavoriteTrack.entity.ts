import { Track } from "src/track/Track.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ManyToOne(() => Track, { onDelete: 'CASCADE' })
  track: Track;

  @Column()
  trackId: string
}