"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TrackSchema = new mongoose_1.Schema({
    id: String,
    album_id: String,
    name: String,
    score: Number,
    type: String,
});
exports.TrackSchema.index({ name: 'text' });
//# sourceMappingURL=tracks.model.js.map