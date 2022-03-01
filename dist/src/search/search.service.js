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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const albums_service_1 = require("../albums/albums.service");
const artists_service_1 = require("../artists/artists.service");
const tracks_service_1 = require("../tracks/tracks.service");
let SearchService = class SearchService {
    constructor(artistsService, tracksService, albumsService) {
        this.artistsService = artistsService;
        this.tracksService = tracksService;
        this.albumsService = albumsService;
    }
    async searchByName(name) {
        const artists = await this.artistsService.searchByName(name);
        const tracks = await this.tracksService.searchByName(name);
        const albums = await this.albumsService.searchByName(name);
        return [...artists, ...tracks, ...albums];
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [artists_service_1.ArtistsService,
        tracks_service_1.TracksService,
        albums_service_1.AlbumsService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map