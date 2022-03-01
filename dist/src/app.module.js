"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const albums_module_1 = require("./albums/albums.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const artists_module_1 = require("./artists/artists.module");
const search_module_1 = require("./search/search.module");
const tracks_module_1 = require("./tracks/tracks.module");
const insights_module_1 = require("./insights/insights.module");
const mongoose_1 = require("@nestjs/mongoose");
const CONSTANTS = require("../utils/constants");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            artists_module_1.ArtistsModule,
            tracks_module_1.TracksModule,
            albums_module_1.AlbumsModule,
            search_module_1.SearchModule,
            insights_module_1.InsightsModule,
            mongoose_1.MongooseModule.forRoot(CONSTANTS.MONGO_DB_URL),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map