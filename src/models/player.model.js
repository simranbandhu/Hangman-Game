const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
});

const PlayerModel = mongoose.model('Player', PlayerSchema);
module.exports = PlayerModel;