const GameModel = require('../models/game.model');
const { v4: uuidv4 } = require('uuid');

const createGame = async (req, res) => {
    try {
        const { roomId } = req.body; // Ensure this roomId is the same as the one created in createRoom
        const gameData = {
            roomId: roomId,
            currentWord: '',
            guessedLetters: [],
            incorrectGuesses: 0,
            maxIncorrectGuesses: 6,
            currentTurn: 0,
            gameStarted: false,
            playerScores: {},
            hint: ""
        };

        const game = new GameModel(gameData);
        await game.save();

        res.status(201).json({ message: 'Game created successfully', roomId: roomId });
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    createGame
};