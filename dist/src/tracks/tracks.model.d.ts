import { Schema } from 'mongoose';
export declare const TrackSchema: Schema<any, import("mongoose").Model<any, any, any, any>, any, any>;
export interface TrackInterface {
    id: string;
    album_id: string;
    name: string;
    score: number;
    type: string;
}
