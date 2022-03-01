import { Model } from 'mongoose';
import { ArtistInterface } from './artists.model';
export declare class ArtistsService {
    private artistModel;
    constructor(artistModel: Model<ArtistInterface>);
    searchByName(name: string): Promise<{
        id: any;
        artist_id: any;
        name: string;
        score: number;
        type: string;
    }[]>;
    findById(id: string): Promise<any[]>;
    getGenresWithMostArtists(): Promise<any[]>;
    getPopularArtistsOfGenre(genre: string): Promise<any[]>;
    getTop10Genres(): Promise<any[]>;
}
