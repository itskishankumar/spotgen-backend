import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
export declare class SearchService {
    private readonly artistsService;
    private readonly tracksService;
    private readonly albumsService;
    constructor(artistsService: ArtistsService, tracksService: TracksService, albumsService: AlbumsService);
    searchByName(name: string): Promise<({
        id: any;
        artist_id: any;
        name: string;
        score: number;
        type: string;
    } | {
        id: any;
        album_id: string;
        name: string;
        score: number;
        type: string;
    })[]>;
}
