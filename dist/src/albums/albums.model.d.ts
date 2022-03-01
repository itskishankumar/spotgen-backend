import { Schema } from 'mongoose';
export declare const AlbumSchema: Schema<any, import("mongoose").Model<any, any, any, any>, any, any>;
export interface AlbumInterface {
    id: string;
    artist_id: string;
    name: string;
    score: number;
    type: string;
    image: string;
}
