const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});



const RoomModel = mongoose.model('rooms', RoomSchema);
module.exports = RoomModel;