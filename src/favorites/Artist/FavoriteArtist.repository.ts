import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteArtist } from './FavoriteArtist.entity';


export class FavoriteArtistRepository {
  constructor(
    @InjectRepository(FavoriteArtist)
    private favoriteArtistRepository: Repository<FavoriteArtist>
  ) {}

  async getFavorites(): Promise<FavoriteArtist[]> {
    const favoriteArtists = await this.favoriteArtistRepository.find()
    
    return favoriteArtists
  }
  async findOne(id: string): Promise<FavoriteArtist> {

    return this.favoriteArtistRepository.findOne({ 
    where: {
        id
    } 
    })
  }
  async add(favoriteArtist: FavoriteArtist): Promise<void> {

    await this.favoriteArtistRepository.insert(favoriteArtist)
  }

  async delete(favoriteArtist: FavoriteArtist): Promise<void> {

    await this.favoriteArtistRepository.delete(favoriteArtist.id)
  }
}
