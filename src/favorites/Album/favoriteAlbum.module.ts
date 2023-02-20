import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteAlbum } from "./FavoriteAlbum.entity";
import { FavoriteAlbumRepository } from "./FavoriteAlbum.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([FavoriteAlbum]),
    ],
    controllers: [],
    providers: [FavoriteAlbumRepository],
    exports: [FavoriteAlbumRepository]
})

export class FavoriteAlbumModule {}