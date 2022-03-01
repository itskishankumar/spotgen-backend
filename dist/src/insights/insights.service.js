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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const albums_service_1 = require("../albums/albums.service");
const artists_service_1 = require("../artists/artists.service");
const tracks_service_1 = require("../tracks/tracks.service");
const helper_1 = require("../../utils/helper");
let InsightsService = class InsightsService {
    constructor(artistsService, tracksService, albumsService) {
        this.artistsService = artistsService;
        this.tracksService = tracksService;
        this.albumsService = albumsService;
    }
    async getAudioTrendsOverTime() {
        return await this.tracksService.getAudioTrendsOverTime();
    }
    async getArtistLongestReleaseSpans() {
        return await this.albumsService.getArtistLongestReleaseSpans();
    }
    async getGenresWithMostArtists() {
        return await this.artistsService.getGenresWithMostArtists();
    }
    async getPopularArtistsOfGenre(genre) {
        return await this.artistsService.getPopularArtistsOfGenre(genre);
    }
    async getTop10Genres() {
        return await this.artistsService.getTop10Genres();
    }
    async getTracksPopularityInsight() {
        const mostPopularTrackdata = await this.tracksService.getMostPopularTrackData();
        const avgTrackData = await this.tracksService.getAudioTrendsOverTime();
        let deviationsArray = [];
        for (let i = 0; i < mostPopularTrackdata.length; i++) {
            let sumOfDeviations = 0;
            sumOfDeviations +=
                Math.abs(mostPopularTrackdata[i].acousticness -
                    avgTrackData[i].avgAcousticness) +
                    Math.abs(mostPopularTrackdata[i].danceability -
                        avgTrackData[i].avgDanceability) +
                    Math.abs(mostPopularTrackdata[i].instrumentalness -
                        avgTrackData[i].avgInstrumentalness) +
                    Math.abs(mostPopularTrackdata[i].liveness - avgTrackData[i].avgLiveness) +
                    Math.abs(mostPopularTrackdata[i].valence - avgTrackData[i].avgValence) +
                    Math.abs(mostPopularTrackdata[i].energy - avgTrackData[i].avgEnergy) +
                    Math.abs(mostPopularTrackdata[i].speechiness - avgTrackData[i].avgSpeechiness);
            deviationsArray.push(sumOfDeviations);
        }
        deviationsArray = (0, helper_1.normalizeArray)(deviationsArray);
        for (let i = 0; i < mostPopularTrackdata.length; i++) {
            mostPopularTrackdata[i]['normalizedDeviationFromAvg'] =
                deviationsArray[i];
            delete mostPopularTrackdata[i]['acousticness'];
            delete mostPopularTrackdata[i]['danceability'];
            delete mostPopularTrackdata[i]['instrumentalness'];
            delete mostPopularTrackdata[i]['liveness'];
            delete mostPopularTrackdata[i]['valence'];
            delete mostPopularTrackdata[i]['energy'];
            delete mostPopularTrackdata[i]['speechiness'];
        }
        return mostPopularTrackdata;
    }
};
InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService,
        tracks_service_1.TracksService,
        albums_service_1.AlbumsService])
], InsightsService);
exports.InsightsService = InsightsService;
//# sourceMappingURL=insights.service.js.map