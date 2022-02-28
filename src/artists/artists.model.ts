import { Schema } from 'mongoose';

export const ArtistSchema = new Schema({
  id: String,
  artist_id: String,
  name: String,
  score: Number,
  type: String,
});
ArtistSchema.index({ name: 'text' });

export interface ArtistInterface {
  id: string;
  artist_id: string;
  name: string;
  score: number;
  type: string;
}
