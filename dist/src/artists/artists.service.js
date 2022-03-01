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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const CONSTANTS = require("../../utils/constants");
let ArtistsService = class ArtistsService {
    constructor(artistModel) {
        this.artistModel = artistModel;
    }
    async searchByName(name) {
        const data = await this.artistModel
            .find({ $text: { $search: name } }, { score: { $meta: 'textScore' } })
            .limit(10)
            .sort({ score: { $meta: 'textScore' } });
        return data.map((artist) => ({
            id: artist.id,
            artist_id: artist.id,
            name: artist.name,
            score: artist.score,
            type: artist.type,
        }));
    }
    async findById(id) {
        let data = await this.artistModel.aggregate([
            {
                $match: {
                    id: id,
                },
            },
            {
                $lookup: {
                    from: 'spotify_albums',
                    localField: 'id',
                    foreignField: 'artist_id',
                    as: 'albums',
                },
            },
            {
                $project: {
                    _id: 0,
                    artist_popularity: 1,
                    followers: 1,
                    name: 1,
                    'albums.image': 1,
                    'albums.name': 1,
                    'albums.release_date': 1,
                    'albums.id': 1,
                },
            },
        ]);
        if (data != undefined && data != null && data != [] && data.length != 0) {
            data = data[0];
            data['followers'] = data['followers'].toLocaleString();
            data['albums'].forEach((album) => {
                album.release_date = album.release_date.getUTCFullYear().toString();
            });
        }
        return data;
    }
    async getGenresWithMostArtists() {
        const data = await this.artistModel.aggregate([
            {
                $group: {
                    _id: '$genre',
                    noOfArtists: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    noOfArtists: -1,
                },
            },
            {
                $limit: 11,
            },
            {
                $project: {
                    genre: '$_id',
                    noOfArtists: 1,
                    _id: 0,
                },
            },
            {
                $skip: 1,
            },
        ]);
        return data;
    }
    async getPopularArtistsOfGenre(genre) {
        const data = await this.artistModel.aggregate([
            {
                $match: {
                    genre: genre,
                },
            },
            {
                $sort: {
                    artist_popularity: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    artist_name: '$name',
                    genre: '$genre',
                    artist_followers: '$followers',
                    artist_popularity: '$artist_popularity',
                    _id: 0,
                    id: 1,
                },
            },
        ]);
        return data;
    }
    async getTop10Genres() {
        const data = await this.artistModel.aggregate([
            {
                $group: {
                    _id: '$genre',
                    noOfArtists: {
                        $sum: 1,
                    },
                },
            },
            {
                $set: {
                    genre: '$_id',
                },
            },
            {
                $project: {
                    genre: 1,
                    _id: 0,
                    noOfArtists: 1,
                },
            },
            {
                $sort: {
                    noOfArtists: -1,
                },
            },
            {
                $skip: 1,
            },
            {
                $limit: 10,
            },
        ]);
        return data;
    }
};
ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(CONSTANTS.SPOTIFY_ARTISTS_COLLECTION_NAME)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArtistsService);
exports.ArtistsService = ArtistsService;
//# sourceMappingURL=artists.service.js.map