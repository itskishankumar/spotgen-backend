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
exports.InsightsController = void 0;
const common_1 = require("@nestjs/common");
const insights_service_1 = require("./insights.service");
let InsightsController = class InsightsController {
    constructor(insightsService) {
        this.insightsService = insightsService;
    }
    async getAudioTrendsOverTime() {
        return await this.insightsService.getAudioTrendsOverTime();
    }
    async getArtistLongestReleaseSpans() {
        return await this.insightsService.getArtistLongestReleaseSpans();
    }
    async getGenresWithMostArtists() {
        return await this.insightsService.getGenresWithMostArtists();
    }
    async getPopularArtistsOfGenre(genre) {
        return await this.insightsService.getPopularArtistsOfGenre(genre);
    }
    async getTop10Genres() {
        return await this.insightsService.getTop10Genres();
    }
    async getTracksPopularityInsight() {
        return await this.insightsService.getTracksPopularityInsight();
    }
};
__decorate([
    (0, common_1.Get)('/getAudioTrendsOverTime'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getAudioTrendsOverTime", null);
__decorate([
    (0, common_1.Get)('/getArtistLongestReleaseSpans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getArtistLongestReleaseSpans", null);
__decorate([
    (0, common_1.Get)('/getGenresWithMostArtists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getGenresWithMostArtists", null);
__decorate([
    (0, common_1.Get)('/getPopularArtistsOfGenre/:genre'),
    __param(0, (0, common_1.Param)('genre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getPopularArtistsOfGenre", null);
__decorate([
    (0, common_1.Get)('/getTop10Genres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getTop10Genres", null);
__decorate([
    (0, common_1.Get)('/getTracksPopularityInsight'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getTracksPopularityInsight", null);
InsightsController = __decorate([
    (0, common_1.Controller)('insights/'),
    __metadata("design:paramtypes", [insights_service_1.InsightsService])
], InsightsController);
exports.InsightsController = InsightsController;
//# sourceMappingURL=insights.controller.js.map