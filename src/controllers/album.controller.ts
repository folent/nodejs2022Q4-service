import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { isUUID, UUIDVersion } from 'class-validator';
import { v4 } from 'uuid'
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from 'src/services/album.service';
import { AlbumEntity, UpdateAlbumDto } from 'src/entities/Album.entity';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from 'src/services/favorites.service';

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
  async getAlbum(@Param('id') id: UUIDVersion): Promise<AlbumEntity> {
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
  async addTrack(@Body() body: AlbumEntity) {
    const newAlbum: AlbumEntity = {
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
    @Param('id') id: UUIDVersion,
    @Body() body: UpdateAlbumDto
    ): Promise<AlbumEntity> {
      
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const album = await this.albumService.getAlbum(id);

    if (!album) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND)
    }

    const updatedAlbum = await this.albumService.updateAlbum(id, body)

    return updatedAlbum
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Album is not found' })
  async deleteAlbum(
    @Param('id') id: UUIDVersion,
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
