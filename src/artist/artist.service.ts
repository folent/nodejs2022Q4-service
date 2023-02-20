import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import { Artist } from 'src/artist/Artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArtistDto } from './UpdateArtist.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private trackRepository: TrackService
  ) {}
  async getArtists(): Promise<Artist[]> {
    const artists = await this.artistRepository.find()

    return artists;
  }
  async getArtist(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: {
        id
      }
    })

    return artist
  }
  async addArtist(artist: Artist): Promise<Artist> {
    await this.artistRepository.insert(artist);

    return Promise.resolve(artist)
  }
  async updateArtist(id: string, data: UpdateArtistDto): Promise<Artist> {
    await this.artistRepository.update({ id }, { ...data })

    return await this.artistRepository.findOne({
      where: {
        id
      }
    })
  }

  async deleteArtist(id: string): Promise<Boolean> {
    const tracks = await this.trackRepository.getTracksByArtistId(id);

    await Promise.all(
      tracks.map(
        track => {
          return this.trackRepository.setNullToArtistForTrack(track.id);
        }
      )
    )

    await this.artistRepository.delete({ id });
    
    return Promise.resolve(true)
  }
}
