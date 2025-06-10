import { Schema } from 'mongoose';

export const AlbumSchema = new Schema({
  id: String,
  artist_id: String,
  name: String,
  score: Number,
  type: String,
  image: String,
});
AlbumSchema.index({ name: 'text' });
AlbumSchema.index({ id: 1 });

export interface AlbumInterface {
  id: string;
  artist_id: string;
  name: string;
  score: number;
  type: string;
  image: string;
}
