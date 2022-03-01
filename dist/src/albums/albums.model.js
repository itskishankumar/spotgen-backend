"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AlbumSchema = new mongoose_1.Schema({
    id: String,
    artist_id: String,
    name: String,
    score: Number,
    type: String,
    image: String,
});
exports.AlbumSchema.index({ name: 'text' });
//# sourceMappingURL=albums.model.js.map