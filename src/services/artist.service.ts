import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { ArtistEntity, UpdateArtistDto } from 'src/entities/Artist.entity';

@Injectable()
export class ArtistService {
  getArtists(): Promise<ArtistEntity[]> {
    return Promise.resolve(DB.artists)
  }
  getArtist(id: UUIDVersion): ArtistEntity {
    const artist = DB.artists.find(u => u.id === id)

    return artist
  }
  addArtist(artist: ArtistEntity): Promise<ArtistEntity> {
    DB.artists.push(artist)

    return Promise.resolve(artist)
  }
  updateArtist(id: UUIDVersion, data: UpdateArtistDto): Promise<ArtistEntity> {
    const artistIndex = DB.tracks.findIndex(u => u?.id === id);
    DB.artists[artistIndex] = {
      id: id.toString(),
      ...data
    }

    return Promise.resolve(DB.artists[artistIndex])
  }

  deleteArtist(id: UUIDVersion): Promise<Boolean> {
    DB.artists = DB.artists.filter(u => u.id !== id);
    DB.tracks = DB.tracks.map(t => {
      if (t?.artistId === id) {
        return {
          ...t,
          artistId: null
        }
      }
    })
    
    return Promise.resolve(true)
  }
}
