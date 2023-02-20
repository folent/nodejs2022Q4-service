import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoritesModule } from "src/favorites/favorites.module";
import { TrackModule } from "src/track/track.module";
import { TrackService } from "src/track/track.service";
import { AlbumController } from "./album.controller";
import { Album } from "./Album.entity";
import { AlbumService } from "./album.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Album]),
        TrackModule,
        FavoritesModule
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService]
})

export class AlbumModule {}