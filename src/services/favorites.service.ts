import { Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { FavoritesEntity } from 'src/entities/Favorites.entity';

@Injectable()
export class FavoritesService {
  getFavorites(): Promise<FavoritesEntity> {
    return Promise.resolve(DB.favorites)
  }
  getTrack(id: UUIDVersion): Promise<UUIDVersion | undefined> {
    const track = DB.favorites.tracks.find(t => t === id);

    return Promise.resolve(track as UUIDVersion)
  }
  addTrack(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.tracks.push(id.toString())

    return Promise.resolve(id)
  }
  deleteTrack(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.tracks = DB.favorites.tracks.filter(t => t !== id);

    return Promise.resolve(id)
  }
  getAlbum(id: UUIDVersion): Promise<UUIDVersion | undefined> {
    const album = DB.favorites.albums.find(t => t === id);

    return Promise.resolve(album as UUIDVersion)
  }
  addAlbum(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.albums.push(id.toString())

    return Promise.resolve(id)
  }
  deleteAlbum(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.albums = DB.favorites.albums.filter(t => t !== id);
    
    return Promise.resolve(id)
  }
  getArtist(id: UUIDVersion): Promise<UUIDVersion | undefined> {
    const artist = DB.favorites.artists.find(t => t === id);

    return Promise.resolve(artist as UUIDVersion)
  }
  addArtist(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.artists.push(id.toString())

    return Promise.resolve(id)
  }
  deleteArtist(id: UUIDVersion): Promise<UUIDVersion> {
    DB.favorites.artists = DB.favorites.artists.filter(t => t !== id);
    
    return Promise.resolve(id)
  }
}
