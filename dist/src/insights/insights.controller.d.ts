import { InsightsService } from './insights.service';
export declare class InsightsController {
    private readonly insightsService;
    constructor(insightsService: InsightsService);
    getAudioTrendsOverTime(): Promise<any[]>;
    getArtistLongestReleaseSpans(): Promise<any[]>;
    getGenresWithMostArtists(): Promise<any[]>;
    getPopularArtistsOfGenre(genre: string): Promise<any[]>;
    getTop10Genres(): Promise<any[]>;
    getTracksPopularityInsight(): Promise<any[]>;
}
