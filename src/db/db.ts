import { AlbumEntity } from "src/entities/Album.entity";
import { ArtistEntity } from "src/entities/Artist.entity";
import { FavoritesEntity } from "src/entities/Favorites.entity";
import { TrackEntity } from "src/entities/Track.entity";
import { UserEntity } from "src/entities/User.entity";

class DB {
    users: UserEntity[]
    albums: AlbumEntity[]
    artists: ArtistEntity[]
    favorites: FavoritesEntity
    tracks: TrackEntity[]
    constructor() {
        this.users = [];
        this.albums = [];
        this.artists = [];
        this.tracks = [];
        this.favorites = {
            artists: [],
            albums: [],
            tracks: [],
        }
    }
}

export default new DB()