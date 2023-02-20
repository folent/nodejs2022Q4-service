import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoritesModule } from "src/favorites/favorites.module";
import { TrackModule } from "src/track/track.module";
import { TrackService } from "src/track/track.service";
import { ArtistController } from "./artist.controller";
import { Artist } from "./Artist.entity";
import { ArtistService } from "./artist.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Artist]),
        TrackModule,
        forwardRef(() => FavoritesModule)
    ],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService]
})

export class ArtistModule {}