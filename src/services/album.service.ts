import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { AlbumEntity, UpdateAlbumDto } from 'src/entities/Album.entity';

@Injectable()
export class AlbumService {
  getAlbums(): Promise<AlbumEntity[]> {
    return Promise.resolve(DB.albums)
  }
  getAlbum(id: UUIDVersion): AlbumEntity {
    const album = DB.albums.find(u => u.id === id)

    return album
  }
  addAlbum(album: AlbumEntity): Promise<AlbumEntity> {
    DB.albums.push(album)

    return Promise.resolve(album)
  }
  updateAlbum(id: UUIDVersion, data: UpdateAlbumDto): Promise<AlbumEntity> {
    const albumIndex = DB.albums.findIndex(u => u.id === id);
    DB.albums[albumIndex] = {
      id: id.toString(),
      ...data
    }

    return Promise.resolve(DB.albums[albumIndex])
  }

  deleteAlbum(id: UUIDVersion): Promise<Boolean> {
    DB.albums = DB.albums.filter(u => u.id !== id);
    DB.tracks = DB.tracks.map(t => {
      if (t?.albumId === id) {
        return {
          ...t,
          albumId: null
        }
      }
    })
    return Promise.resolve(true)
  }
}
