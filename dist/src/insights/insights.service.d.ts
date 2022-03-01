import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
export declare class InsightsService {
    private readonly artistsService;
    private readonly tracksService;
    private readonly albumsService;
    constructor(artistsService: ArtistsService, tracksService: TracksService, albumsService: AlbumsService);
    getAudioTrendsOverTime(): Promise<any[]>;
    getArtistLongestReleaseSpans(): Promise<any[]>;
    getGenresWithMostArtists(): Promise<any[]>;
    getPopularArtistsOfGenre(genre: string): Promise<any[]>;
    getTop10Genres(): Promise<any[]>;
    getTracksPopularityInsight(): Promise<any[]>;
}
