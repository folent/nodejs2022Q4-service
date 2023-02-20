import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import DB from 'src/db/db';
import { Favorites } from 'src/favorites/Favorites.entity';
import { Repository } from 'typeorm';
import { FavoritesResponse } from './FavoritesResponse.dto';
import { Inject, forwardRef } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { FavoriteTrackRepository } from './Track/FavoriteTrack.repository';
import { FavoriteAlbumRepository } from './Album/FavoriteAlbum.repository';
import { FavoriteArtistRepository } from './Artist/FavoriteArtist.repository';
import { FavoriteTrack } from './Track/FavoriteTrack.entity';
import { FavoriteAlbum } from './Album/FavoriteAlbum.entity';
import { Album } from 'src/album/Album.entity';
import { FavoriteArtist } from './Artist/FavoriteArtist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoriteTracksRepository: FavoriteTrackRepository,
    private readonly favoriteAlbumRepository: FavoriteAlbumRepository,
    private readonly favoriteArtistRepository: FavoriteArtistRepository,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const response: FavoritesResponse = {
      tracks: [],
      albums: [],
      artists: []
    }
    const artists = await this.favoriteArtistRepository.getFavorites()
    const albums = await this.favoriteAlbumRepository.getFavorites()
    const tracks = await this.favoriteTracksRepository.getFavorites()
    

    const artistsPromises = artists.map(
      artist => this.artistService.getArtist(artist.id).then(res => {
        if (res) {
          return res
        } else {
          artist
        }
      })
    )
    const albumsPromises = albums.map(
      album => this.albumService.getAlbum(album.id).then(res => {
        if (res) {
          return res
        } else {
          album
        }
      })
    )
    const tracksPromises = tracks.map(
      track => this.trackService.getTrack(track.id)
    )
    response.artists = await Promise.all(artistsPromises)
    response.albums = await Promise.all(albumsPromises)
    response.tracks = await Promise.all(tracksPromises)
    
    return response
  }
  async getTrack(id: string): Promise<FavoriteTrack> {

    return this.favoriteTracksRepository.findOne(id)
  }
  async addTrack(id: string): Promise<void> {
    const track = new FavoriteTrack();
    track.id = id;

    await this.favoriteTracksRepository.add(track)
  }
  async deleteTrack(id: string): Promise<string> {
    const track = new FavoriteTrack();
    track.id = id;

    await this.favoriteTracksRepository.delete(track);

    return Promise.resolve(id)
  }
  async getAlbum(id: string): Promise<FavoriteAlbum> {
    const album = await this.favoriteAlbumRepository.findOne(id);

    return Promise.resolve(album)
  }
  async addAlbum(id: string): Promise<string> {
    const album = new FavoriteAlbum();
    album.id = id;

    await this.favoriteAlbumRepository.add(album);

    return Promise.resolve(id)
  }
  async deleteAlbum(id: string): Promise<string> {
    const album = new FavoriteAlbum();
    album.id = id;

    await this.favoriteAlbumRepository.delete(album)
    
    return Promise.resolve(id)
  }
  async getArtist(id: string): Promise<FavoriteArtist> {
    const artist = await this.favoriteArtistRepository.findOne(id);

    return Promise.resolve(artist)
  }
  async addArtist(id: string): Promise<string> {
    const artist = new FavoriteArtist();
    artist.id = id;

    await this.favoriteArtistRepository.add(artist)

    return Promise.resolve(id)
  }
  async deleteArtist(id: string): Promise<string> {
    const artist = new FavoriteArtist();
    artist.id = id;
    
    await this.favoriteArtistRepository.delete(artist);

    return Promise.resolve(id)
  }
}
