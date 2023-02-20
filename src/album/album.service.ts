import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/Album.entity';
import { UpdateAlbumDto } from './UpdateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor (
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private trackRepository: TrackService,
  ) {}
  async getAlbums(): Promise<Album[]> {
    const albums = await this.albumRepository.find();

    return albums;
  }
  async getAlbum(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: {
        id
      }
    })

    return album
  }
  async addAlbum(album: Album): Promise<Album> {
    await this.albumRepository.insert(album)

    return Promise.resolve(album)
  }
  async updateAlbum(id: string, data: UpdateAlbumDto): Promise<void> {
    await this.albumRepository.update({ id }, {
      ...data
    })
  }

  async deleteAlbum(id: string): Promise<Boolean> {
    const tracks = await this.trackRepository.getTracksByAlbumId(id);

    await Promise.all(
      tracks.map(
        track => {
          return this.trackRepository.setNullToAlbumForTrack(track.id);
        }
      )
    )
    await this.albumRepository.delete({
      id
    })
    
    return Promise.resolve(true)
  }
}
