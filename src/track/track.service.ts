import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/track/Track.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './CreateTrack.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>
  ) {}

  async getTracks(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();

    return tracks
  }
  async getTrack(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({
      where: {
        id
      }
    })

    return track
  }
  async getTracksByAlbumId(id: string): Promise<Track[]> {
    const tracks = await this.trackRepository.find({
      where: {
        albumId: id
      }
    })

    return tracks
  }
  async setNullToAlbumForTrack(id: string): Promise<void> {
     await this.trackRepository.update({ id }, {
      albumId: null
    })
  }
  async getTracksByArtistId(id: string): Promise<Track[]> {
    const tracks = await this.trackRepository.find({
      where: {
        artistId: id
      }
    })

    return tracks
  }
  async setNullToArtistForTrack(id: string): Promise<void> {
     await this.trackRepository.update({ id }, {
      artistId: null
    })
  }
  async addTrack(data: Track): Promise<Track> {
    await this.trackRepository.insert(data)
    
    return data;
  }
  async updateTrack(id: string, data: CreateTrackDto): Promise<Track> {
    await this.trackRepository.update(
    {
      id
    },
    {
      ...data
    })
    // const trackIndex = DB.tracks.findIndex(u => u?.id === id);
    // DB.tracks[trackIndex] = {
      // id: id.toString(),
      // ...data
    // }

    return await this.trackRepository.findOne({
      where: {
        id: id.toString()
      }
    })
  }

  async deleteTrack(id: string): Promise<Boolean> {
    await this.trackRepository.delete({
      id
    })
    
    return Promise.resolve(true)
  }
}
