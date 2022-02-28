import { Schema } from 'mongoose';

export const TrackSchema = new Schema({
  id: String,
  album_id: String,
  name: String,
  score: Number,
  type: String,
});
TrackSchema.index({ name: 'text' });

export interface TrackInterface {
  id: string;
  album_id: string;
  name: string;
  score: number;
  type: string;
}
