import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req, Res, UseInterceptors } from '@nestjs/common';
import { isUUID, UUIDVersion } from 'class-validator';
import { TrackService } from './track.service';
import { v4 } from 'uuid'
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Track } from 'src/track/Track.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTrackDto } from './CreateTrack.dto';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  async getTracks() {
    const tracks = await this.trackService.getTracks();
    return tracks
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get single track by id' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  async getTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const track = await this.trackService.getTrack(id);

    if (!track) {
      throw new HttpException('track doesn`t exists', HttpStatus.NOT_FOUND)
    }
    return track
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  @UseInterceptors(ClassSerializerInterceptor)
  async addTrack(@Body() body: CreateTrackDto) {
    const newTrack: Track = new Track();

    newTrack.id = v4();
    newTrack.name = body.name;
    newTrack.duration = body.duration;
    newTrack.albumId = body.albumId;
    newTrack.artistId = body.artistId;

    const track = await this.trackService.addTrack(newTrack);

    return track
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update track' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateTrackDto
    ): Promise<Track> {
      
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const track = await this.trackService.getTrack(id);

    if (!track) {
      throw new HttpException('track doesn`t exists', HttpStatus.NOT_FOUND)
    }

    const updatedTrack = await this.trackService.updateTrack(id, body)

    return updatedTrack
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete track' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Track not found' })
  async deleteTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ){
    if (!isUUID(id)) {
      throw new HttpException('id is not validate', HttpStatus.BAD_REQUEST)
    }
    const track = await this.trackService.getTrack(id);

    if (!track) {
      throw new HttpException('Track doesn`t exists', HttpStatus.NOT_FOUND)
    }
    await this.trackService.deleteTrack(id);
    await this.favoritesService.deleteTrack(id);

    return res.status(StatusCodes.NO_CONTENT).json(true);
  }
}
