import { Album } from "src/album/Album.entity";
import { Artist } from "src/artist/Artist.entity";
import { Track } from "src/track/Track.entity";

export class FavoritesResponse {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}