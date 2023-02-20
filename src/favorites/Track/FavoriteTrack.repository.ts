import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteTrack } from './FavoriteTrack.entity';


export class FavoriteTrackRepository {
  constructor(
    @InjectRepository(FavoriteTrack)
    private favoriteTrackRepository: Repository<FavoriteTrack>
  ) {}

  async getFavorites(): Promise<FavoriteTrack[]> {
    const favoriteAlbum = await this.favoriteTrackRepository.find()
    
    return favoriteAlbum
  }
  async findOne(id: string): Promise<FavoriteTrack> {

    return this.favoriteTrackRepository.findOne({ 
    where: {
        id
      } 
    })
  }
  async add(favoriteTrack: FavoriteTrack): Promise<void> {

    await this.favoriteTrackRepository.insert(favoriteTrack)
  }

  async delete(favoriteTrack: FavoriteTrack): Promise<void> {

    await this.favoriteTrackRepository.delete(favoriteTrack.id)
  }
}
