import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteArtist } from "./FavoriteArtist.entity";
import { FavoriteArtistRepository } from "./FavoriteArtist.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([FavoriteArtist]),
    ],
    controllers: [],
    providers: [FavoriteArtistRepository],
    exports: [FavoriteArtistRepository]
})

export class FavoriteArtistModule {}