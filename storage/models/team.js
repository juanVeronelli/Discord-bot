const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "president": {
        type: String,
        required: true
    },
    "players": [
        { type: mongoose.Schema.Types.ObjectId, ref: "PLAYERS" }
    ],
    "matchs": [
        { type: mongoose.Schema.Types.ObjectId, ref: "MATCHS" }
    ],
    "points": {
        type: Number,
        default: 0
    },
    "formation": {
        type: String,
        default: "3-2-1"
    },
    "style": {
        type: String,
        default: "posession"
    },
    "money": {
        type: Number,
        default: 45000000
    },
    "hincha": {
        type: String,
    },
    "logotype": {
        type: String,
    },
})

const model = mongoose.model('TEAMS', teamSchema);
module.exports = model;