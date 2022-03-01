"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsModule = void 0;
const common_1 = require("@nestjs/common");
const albums_module_1 = require("../albums/albums.module");
const artists_module_1 = require("../artists/artists.module");
const tracks_module_1 = require("../tracks/tracks.module");
const insights_controller_1 = require("./insights.controller");
const insights_service_1 = require("./insights.service");
let InsightsModule = class InsightsModule {
};
InsightsModule = __decorate([
    (0, common_1.Module)({
        imports: [tracks_module_1.TracksModule, artists_module_1.ArtistsModule, albums_module_1.AlbumsModule],
        controllers: [insights_controller_1.InsightsController],
        providers: [insights_service_1.InsightsService],
    })
], InsightsModule);
exports.InsightsModule = InsightsModule;
//# sourceMappingURL=insights.module.js.map