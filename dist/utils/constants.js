"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPOTIFY_ALBUMS_COLLECTION_NAME = exports.SPOTIFY_ARTISTS_COLLECTION_NAME = exports.SPOTIFY_TRACKS_COLLECTION_NAME = exports.MONGO_DB_URL = void 0;
require("dotenv/config");
exports.MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@ghost0.ymhob.mongodb.net/spotgen?retryWrites=true&w=majority`;
exports.SPOTIFY_TRACKS_COLLECTION_NAME = 'spotify_track';
exports.SPOTIFY_ARTISTS_COLLECTION_NAME = 'spotify_artist';
exports.SPOTIFY_ALBUMS_COLLECTION_NAME = 'spotify_album';
//# sourceMappingURL=constants.js.map