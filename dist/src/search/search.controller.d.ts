import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
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
