import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoritesModule } from "src/favorites/favorites.module";
import { FavoritesService } from "src/favorites/favorites.service";
import { FavoriteTrackRepository } from "src/favorites/Track/FavoriteTrack.repository";
import { TrackController } from "./track.controller";
import { Track } from "./Track.entity";
import { TrackService } from "./track.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Track]),
        forwardRef(() => FavoritesModule)
    ],
    controllers: [TrackController],
    providers: [TrackService],
    exports: [TrackService]
})

export class TrackModule {}