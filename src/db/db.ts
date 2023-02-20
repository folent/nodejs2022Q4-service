import { Album } from "src/album/Album.entity";
import { Artist } from "src/artist/Artist.entity";
import { Favorites } from "src/favorites/Favorites.entity";
import { Track } from "src/track/Track.entity";
import { User } from "src/user/User.entity";

class DB {
    users: User[]
    albums: Album[]
    artists: Artist[]
    favorites: Favorites
    tracks: Track[]
    constructor() {
        this.users = [];
        this.albums = [];
        this.artists = [];
        this.tracks = [];
        // this.favorites = {
        //     artists: [],
        //     albums: [],
        //     tracks: [],
        // }
    }
}

export default new DB()