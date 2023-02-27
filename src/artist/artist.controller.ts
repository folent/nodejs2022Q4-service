import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { isUUID, UUIDVersion } from 'class-validator';
import { ArtistService } from './artist.service';
import { v4 } from 'uuid'
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Artist } from 'src/artist/Artist.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateArtistDto } from './CreateArtist.dto';
import { UpdateArtistDto } from './UpdateArtist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@ApiTags('Artist')
@UseGuards(JwtAuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly favoritesService: FavoritesService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  async getArtists() {
    const artists = await this.artistService.getArtists();
    return artists
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  async getArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const artist = await this.artistService.getArtist(id);

    if (!artist) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND)
    }
    return artist
  }
  
  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @UseInterceptors(ClassSerializerInterceptor)
  async addArtist(@Body() body: CreateArtistDto) {
    const newArtist: Artist = {
      id: v4(),
      ...body,
    }
    
    const artist = await this.artistService.addArtist(newArtist);

    return artist
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateArtistDto
    ): Promise<Artist> {
      
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const artist = await this.artistService.getArtist(id);

    if (!artist) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND)
    }

    const updatedArtist = await this.artistService.updateArtist(id, body)

    return updatedArtist
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  async deleteArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const artist = await this.artistService.getArtist(id);

    if (!artist) {
      throw new HttpException('Artist doesn`t exists', HttpStatus.NOT_FOUND)
    }
    await this.artistService.deleteArtist(id);
    await this.favoritesService.deleteArtist(id);

    return res.status(StatusCodes.NO_CONTENT).json(true)
  }
}
