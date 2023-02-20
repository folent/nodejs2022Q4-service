import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumController } from "src/album/album.controller";
import { Album } from "src/album/Album.entity";
import { AlbumModule } from "src/album/album.module";
import { AlbumService } from "src/album/album.service";
import { ArtistController } from "src/artist/artist.controller";
import { Artist } from "src/artist/Artist.entity";
import { ArtistModule } from "src/artist/artist.module";
import { ArtistService } from "src/artist/artist.service";
import { TrackController } from "src/track/track.controller";
import { Track } from "src/track/Track.entity";
import { TrackModule } from "src/track/track.module";
import { TrackService } from "src/track/track.service";
import { FavoritesController } from "./favorites.controller";
import { Favorites } from "./Favorites.entity";
import { FavoritesService } from "./favorites.service";
import { forwardRef } from '@nestjs/common';
import { FavoriteAlbumRepository } from "./Album/FavoriteAlbum.repository";
import { FavoriteArtistRepository } from "./Artist/FavoriteArtist.repository";
import { FavoriteTrackRepository } from "./Track/FavoriteTrack.repository";
import { FavoriteArtist } from "./Artist/FavoriteArtist.entity";
import { FavoriteTrack } from "./Track/FavoriteTrack.entity";
import { FavoriteTrackModule } from "./Track/favoriteTrack.module";
import { FavoriteAlbumModule } from "./Album/favoriteAlbum.module";
import { FavoriteArtistModule } from "./Artist/favoriteArtist.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Favorites]),
        forwardRef(() => ArtistModule),
        forwardRef(() => AlbumModule),
        forwardRef(() => TrackModule),
        forwardRef(() => FavoriteTrackModule),
        forwardRef(() => FavoriteAlbumModule),
        forwardRef(() => FavoriteArtistModule)

    ],
    controllers: [FavoritesController],
    providers: [FavoritesService],
    exports: [FavoritesService]
})

export class FavoritesModule {}