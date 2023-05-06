const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    "id": {
        type: Number,
        required: true
    },
    "stats": {
        type: Object,
        required: true
    },
    "team": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TEAMS",
        default: null
    },
    "goals": {
        type: Number,
        default: 0
    }

})

const model = mongoose.model('PLAYERS', playerSchema);
module.exports = model;