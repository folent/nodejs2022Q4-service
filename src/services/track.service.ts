import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { CreateTrackDto, TrackEntity } from 'src/entities/Track.entity';

@Injectable()
export class TrackService {
  getTracks(): Promise<TrackEntity[]> {

    return Promise.resolve(DB.tracks)
  }
  getTrack(id: UUIDVersion): TrackEntity {
    const track = DB.tracks.find(u => u?.id === id)

    return track
  }
  addTrack(track: TrackEntity): Promise<TrackEntity> {
    DB.tracks.push(track)
    
    return Promise.resolve(track)
  }
  updateTrack(id: UUIDVersion, data: CreateTrackDto): Promise<TrackEntity> {
    const trackIndex = DB.tracks.findIndex(u => u?.id === id);
    DB.tracks[trackIndex] = {
      id: id.toString(),
      ...data
    }

    return Promise.resolve(DB.tracks[trackIndex])
  }

  deleteTrack(id: UUIDVersion): Promise<Boolean> {
    DB.tracks = DB.tracks.filter(u => u?.id !== id);
    
    return Promise.resolve(true)
  }
}
