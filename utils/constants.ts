import 'dotenv/config';

export const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ghost1.gsekr0v.mongodb.net/spotgen_test?retryWrites=true&w=majority&appName=ghost1`;
export const SPOTIFY_TRACKS_COLLECTION_NAME = 'spotify_track';
export const SPOTIFY_ARTISTS_COLLECTION_NAME = 'spotify_artist';
export const SPOTIFY_ALBUMS_COLLECTION_NAME = 'spotify_album';
