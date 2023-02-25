import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/Album.entity';
import { Repository } from 'typeorm';
import { FavoriteAlbum } from './FavoriteAlbum.entity';

export class FavoriteAlbumRepository {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private favoriteAlbumRepository: Repository<FavoriteAlbum>
  ) {}

  async getFavorites(): Promise<FavoriteAlbum[]> {
    const favoriteAlbum = await this.favoriteAlbumRepository.find()
    
    return favoriteAlbum
  }
  async findOne(id: string): Promise<FavoriteAlbum> {

    return this.favoriteAlbumRepository.findOne({ 
    where: {
        albumId: id
      } 
    })
  }
  async add(favoriteAlbum: FavoriteAlbum): Promise<void> {

    await this.favoriteAlbumRepository.insert(favoriteAlbum)
  }

  async delete(id: string): Promise<void> {

    await this.favoriteAlbumRepository.delete({
      albumId: id
    })
  }
}
