import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Res, UseGuards } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ArtistService } from '../artist/artist.service';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@ApiTags('Favorites')
@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService
    ) {}

  @Get()
  @ApiOperation({ summary: 'Get favorites' })
  async getFavorites() {
    const favorites = await this.favoritesService.getFavorites();
    
    return favorites;
  }

  @Post('/track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiCreatedResponse({ description: 'Track added to favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnprocessableEntityResponse({ description: 'Track is not found' })
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }

    const track = await this.trackService.getTrack(id);
    
    if (!track) {
      throw new HttpException('track doesn`t exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const trackIsExists = await this.favoritesService.getTrack(id);

    if (trackIsExists) {
      throw new HttpException('Error', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    await this.favoritesService.addTrack(id);

    return id
  }

  @Delete('/track/:id')
  @ApiOperation({ summary: 'Remove track from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Track deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Track is not in favorites' })
  async deleteTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST);
    }
    const track = await this.favoritesService.getTrack(id);

    if (!track) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Track doesn`t exists' });
    }
    await this.favoritesService.deleteTrack(id);

    return res.status(StatusCodes.NO_CONTENT).json(true)
  }

  @Post('/album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse({ description: 'Album added to favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnprocessableEntityResponse({ description: 'Album not found' })
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }

    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new HttpException('Album doesn`t exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const albumIsExists = await this.favoritesService.getAlbum(id);

    if (albumIsExists) {
      throw new HttpException('Error', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    await this.favoritesService.addAlbum(album);

    return id
  }

  @Delete('/album/:id')
  @ApiOperation({ summary: 'Remove album from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Album deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Album is not in favorites' })
  async deleteAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }

    const album = await this.favoritesService.getAlbum(id);

    if (!album) {
      throw new HttpException('album is not found in favorites', HttpStatus.NOT_FOUND)
    }

    await this.favoritesService.deleteAlbum(id);

    return res.status(StatusCodes.NO_CONTENT).json(true)
  }

  @Post('/artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiCreatedResponse({ description: 'Artist added to favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnprocessableEntityResponse({ description: 'Artist not found' })
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }

    const track = await this.artistService.getArtist(id);
    if (!track) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const artistIsExists = await this.favoritesService.getArtist(id);

    if (artistIsExists) {
      throw new HttpException('Error', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    await this.favoritesService.addArtist(id);

    return id
  }

  @Delete('/artist/:id')
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Artist deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Artist is not in favorites' })
  async deleteArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }

    const artist = await this.favoritesService.getArtist(id);

    if (!artist) {
      throw new HttpException('artist is not found in favorites', HttpStatus.NOT_FOUND)
    }

    await this.favoritesService.deleteArtist(id);

    return res.status(StatusCodes.NO_CONTENT).json(true)
  }
}
