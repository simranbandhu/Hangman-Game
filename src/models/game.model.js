const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    roomId: {
        type: String, // Change to String
        required: true,
        //required: true,
        unique: true
    },
    currentWord: {
        type: String,
        required: false
    },
    hint:{
        type: String,
        required: false
    },
    guessedLetters: {
        type: [String],
        required: false
    },
    incorrectGuesses: {
        type: Number,
        default: 0
    },
    maxIncorrectGuesses: {
        type: Number,
        default: 6
    },
    currentTurn: {
        type: Number,
        default: 0
    },
    gameStarted: {
        type: Boolean,
        default: false
    }
});

const GameModel = mongoose.model('Game', GameSchema);
module.exports = GameModel;