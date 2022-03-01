import { Model } from 'mongoose';
import { AlbumInterface } from './albums.model';
export declare class AlbumsService {
    private albumModel;
    constructor(albumModel: Model<AlbumInterface>);
    searchByName(name: string): Promise<{
        id: any;
        artist_id: string;
        name: string;
        score: number;
        type: string;
        image: string;
    }[]>;
    findById(id: string): Promise<any[]>;
    getArtistLongestReleaseSpans(): Promise<any[]>;
}
