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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const CONSTANTS = require("../../utils/constants");
let AlbumsService = class AlbumsService {
    constructor(albumModel) {
        this.albumModel = albumModel;
    }
    async searchByName(name) {
        const data = await this.albumModel
            .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
            .limit(10)
            .sort({ score: { $meta: 'textScore' } });
        return data.map((album) => ({
            id: album.id,
            artist_id: album.artist_id,
            name: album.name,
            score: album.score,
            type: album.type,
            image: album.image,
        }));
    }
    async findById(id) {
        let data = await this.albumModel.aggregate([
            {
                $match: {
                    id: id,
                },
            },
            {
                $lookup: {
                    from: 'spotify_artists',
                    localField: 'artist_id',
                    foreignField: 'id',
                    as: 'artist_name',
                },
            },
            {
                $set: {
                    release_date: {
                        $year: '$release_date',
                    },
                    artist_name: {
                        $arrayElemAt: ['$artist_name.name', 0],
                    },
                    artist_id: {
                        $arrayElemAt: ['$artist_name.id', 0],
                    },
                },
            },
            {
                $lookup: {
                    from: 'spotify_tracks',
                    localField: 'id',
                    foreignField: 'album_id',
                    as: 'tracks',
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    image: 1,
                    release_date: 1,
                    artist_name: 1,
                    artist_id: 1,
                    'tracks.name': 1,
                    'tracks.id': 1,
                    'tracks.album_id': 1,
                    'tracks.popularity': 1,
                },
            },
        ]);
        data = data[0];
        return data;
    }
    async getArtistLongestReleaseSpans() {
        const data = await this.albumModel.aggregate([
            {
                $group: {
                    _id: '$artist_id',
                    release_last: {
                        $max: '$release_date',
                    },
                    release_first: {
                        $min: '$release_date',
                    },
                },
            },
            {
                $set: {
                    release_diff: {
                        $dateDiff: {
                            startDate: '$release_first',
                            endDate: '$release_last',
                            unit: 'week',
                        },
                    },
                },
            },
            {
                $sort: {
                    release_diff: -1,
                },
            },
            {
                $skip: 1,
            },
            {
                $limit: 10,
            },
            {
                $lookup: {
                    from: 'spotify_artists',
                    localField: '_id',
                    foreignField: 'id',
                    as: 'artist_name',
                },
            },
            {
                $project: {
                    _id: 0,
                    artist_name: {
                        $arrayElemAt: ['$artist_name.name', 0],
                    },
                    artist_id: {
                        $arrayElemAt: ['$artist_name.id', 0],
                    },
                    release_first: {
                        $year: '$release_first',
                    },
                    release_last: {
                        $year: '$release_last',
                    },
                },
            },
        ]);
        return data;
    }
};
AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(CONSTANTS.SPOTIFY_ALBUMS_COLLECTION_NAME)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map