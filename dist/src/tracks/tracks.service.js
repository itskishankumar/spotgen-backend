"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const CONSTANTS = require("../../utils/constants");
let TracksService = class TracksService {
    constructor(trackModel) {
        this.trackModel = trackModel;
    }
    async searchByName(name) {
        const data = await this.trackModel
            .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
            .limit(10)
            .sort({ score: { $meta: 'textScore' } });
        return data.map((track) => ({
            id: track.id,
            album_id: track.album_id,
            name: track.name,
            score: track.score,
            type: track.type,
        }));
    }
    async getAudioTrendsOverTime() {
        const data = await this.trackModel.aggregate([
            {
                $lookup: {
                    from: 'spotify_albums',
                    localField: 'album_id',
                    foreignField: 'id',
                    as: 'release_date',
                },
            },
            {
                $set: {
                    release_date: {
                        $substr: [
                            {
                                $arrayElemAt: ['$release_date.release_date', 0],
                            },
                            0,
                            4,
                        ],
                    },
                    duration: {
                        $divide: ['$duration_ms', 60000],
                    },
                },
            },
            {
                $group: {
                    _id: '$release_date',
                    avgAcousticness: {
                        $avg: '$acousticness',
                    },
                    avgDanceability: {
                        $avg: '$danceability',
                    },
                    avgSpeechiness: {
                        $avg: '$speechiness',
                    },
                    avgValence: {
                        $avg: '$valence',
                    },
                    avgLoudness: {
                        $avg: '$loudness',
                    },
                    avgEnergy: {
                        $avg: '$energy',
                    },
                    avgLiveness: {
                        $avg: '$liveness',
                    },
                    avgInstrumentalness: {
                        $avg: '$instrumentalness',
                    },
                    avgDuration: {
                        $avg: '$duration',
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $set: {
                    year: '$_id',
                },
            },
            {
                $unset: ['_id', 'duration_ms'],
            },
        ]);
        return data;
    }
    async getMostPopularTrackData() {
        const data = await this.trackModel.aggregate([
            {
                $sort: {
                    popularity: -1,
                },
            },
            {
                $lookup: {
                    from: 'spotify_albums',
                    localField: 'album_id',
                    foreignField: 'id',
                    as: 'release_date',
                },
            },
            {
                $set: {
                    release_date: {
                        $substr: [
                            {
                                $arrayElemAt: ['$release_date.release_date', 0],
                            },
                            0,
                            4,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$release_date',
                    energy: {
                        $first: '$energy',
                    },
                    acousticness: {
                        $first: '$acousticness',
                    },
                    danceability: {
                        $first: '$danceability',
                    },
                    instrumentalness: {
                        $first: '$instrumentalness',
                    },
                    liveness: {
                        $first: '$liveness',
                    },
                    speechiness: {
                        $first: '$speechiness',
                    },
                    valence: {
                        $first: '$valence',
                    },
                    artist_id: {
                        $first: '$artist_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'spotify_artists',
                    localField: 'artist_id',
                    foreignField: 'id',
                    as: 'artist_popularity',
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $set: {
                    artist_popularity: {
                        $arrayElemAt: ['$artist_popularity.artist_popularity', 0],
                    },
                    year: '$_id',
                },
            },
            {
                $unset: ['_id', 'artist_id'],
            },
        ], { allowDiskUse: true });
        return data;
    }
};
TracksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(CONSTANTS.SPOTIFY_TRACKS_COLLECTION_NAME)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TracksService);
exports.TracksService = TracksService;
//# sourceMappingURL=tracks.service.js.map