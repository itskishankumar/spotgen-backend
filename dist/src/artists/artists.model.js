"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ArtistSchema = new mongoose_1.Schema({
    id: String,
    artist_id: String,
    name: String,
    score: Number,
    type: String,
});
exports.ArtistSchema.index({ name: 'text' });
//# sourceMappingURL=artists.model.js.map