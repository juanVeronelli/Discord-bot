const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    "teams": [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "TEAMS"

        }
    ],
    "scoreTeam1": {
        type: Number,
        default: 0
    },
    "scoreTeam2": {
        type: Number,
        default: 0
    },
    scorers: [
        { type: String }
    ],
    "apuesta1": [
        { type: mongoose.Schema.Types.ObjectId, ref: "TEAMS" }
    ],
    "apuesta2": [
        { type: mongoose.Schema.Types.ObjectId, ref: "TEAMS" }
    ],
    "apuesta3": [
        { type: mongoose.Schema.Types.ObjectId, ref: "TEAMS" }
    ],

})

const model = mongoose.model('MATCHS', matchSchema);
module.exports = model;