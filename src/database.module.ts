import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./user/User.entity";
import { Module } from "@nestjs/common";
import { Track } from "./track/Track.entity";
import { Album } from "./album/Album.entity";
import { Artist } from "./artist/Artist.entity";
import { FavoriteAlbum } from "./favorites/Album/FavoriteAlbum.entity";
import { FavoriteArtist } from "./favorites/Artist/FavoriteArtist.entity";
import { FavoriteTrack } from "./favorites/Track/FavoriteTrack.entity";


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('POSTGRES_HOST'),
              port: +configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DB'),
              entities: [User, Track, Album, Artist, FavoriteAlbum, FavoriteArtist, FavoriteTrack],
              synchronize: true,
              logging: true
            })
        })
    ]
})

export class DatabaseModule {}