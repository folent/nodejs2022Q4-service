import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumController } from './controllers/album.controller';
import { ArtistController } from './controllers/artist.controller';
import { FavoritesController } from './controllers/favorites.controller';
import { TrackController } from './controllers/track.controller';
import { UserController } from './controllers/user.controller';
import { AlbumService } from './services/album.service';
import { ArtistService } from './services/artist.service';
import { FavoritesService } from './services/favorites.service';
import { TrackService } from './services/track.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TrackController, ArtistController, AlbumController, FavoritesController],
  providers: [AppService, UserService, TrackService, ArtistService, AlbumService, FavoritesService],
})
export class AppModule {}
