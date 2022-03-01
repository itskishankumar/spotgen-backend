import { Model } from 'mongoose';
import { TrackInterface } from './tracks.model';
export declare class TracksService {
    private trackModel;
    constructor(trackModel: Model<TrackInterface>);
    searchByName(name: string): Promise<{
        id: any;
        album_id: string;
        name: string;
        score: number;
        type: string;
    }[]>;
    getAudioTrendsOverTime(): Promise<any[]>;
    getMostPopularTrackData(): Promise<any[]>;
}
