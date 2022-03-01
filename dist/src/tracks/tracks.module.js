"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tracks_controller_1 = require("./tracks.controller");
const tracks_model_1 = require("./tracks.model");
const tracks_service_1 = require("./tracks.service");
const CONSTANTS = require("../../utils/constants");
let TracksModule = class TracksModule {
};
TracksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: CONSTANTS.SPOTIFY_TRACKS_COLLECTION_NAME, schema: tracks_model_1.TrackSchema },
            ]),
        ],
        controllers: [tracks_controller_1.TracksController],
        providers: [tracks_service_1.TracksService],
        exports: [tracks_service_1.TracksService],
    })
], TracksModule);
exports.TracksModule = TracksModule;
//# sourceMappingURL=tracks.module.js.map