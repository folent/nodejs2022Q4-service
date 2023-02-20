import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { isUUID, UUIDVersion } from 'class-validator';
import { v4 } from 'uuid'
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from 'src/album/album.service';
import { Album } from 'src/album/Album.entity';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from 'src/favorites/favorites.service';
import { UpdateAlbumDto } from './UpdateAlbum.dto';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService
    ) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  async getArtists() {
    const albums = await this.albumService.getAlbums();
    return albums
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Album is not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const album = await this.albumService.getAlbum(id);

    if (!album) {
      throw new HttpException('Album doesn`t exists', HttpStatus.NOT_FOUND)
    }
    return album
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @UseInterceptors(ClassSerializerInterceptor)
  async addTrack(@Body() body: Album) {
    const newAlbum: Album = {
      id: v4(),
      ...body,
    }
    const album = await this.albumService.addAlbum(newAlbum);

    return album
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update album' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Album is not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAlbumDto
    ): Promise<UpdateAlbumDto> {
      
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST);
    }
    console.log(id, body);
    
    const album = await this.albumService.getAlbum(id);
    console.log('album', album);
    

    if (!album) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND);
    }

    await this.albumService.updateAlbum(id, body);

    return this.albumService.getAlbum(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Album is not found' })
  async deleteAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const album = await this.albumService.getAlbum(id);

    if (!album) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND)
    }
    await this.albumService.deleteAlbum(id);
    await this.favoritesService.deleteAlbum(id);

    return res.status(StatusCodes.NO_CONTENT).json(true)
  }
}
