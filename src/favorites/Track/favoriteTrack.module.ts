import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteTrack } from "./FavoriteTrack.entity";
import { FavoriteTrackRepository } from "./FavoriteTrack.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([FavoriteTrack]),
    ],
    controllers: [],
    providers: [FavoriteTrackRepository],
    exports: [FavoriteTrackRepository]
})

export class FavoriteTrackModule {}