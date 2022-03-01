import { Schema } from 'mongoose';
export declare const ArtistSchema: Schema<any, import("mongoose").Model<any, any, any, any>, any, any>;
export interface ArtistInterface {
    id: string;
    artist_id: string;
    name: string;
    score: number;
    type: string;
}
