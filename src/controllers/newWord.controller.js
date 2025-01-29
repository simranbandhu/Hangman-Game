const GameModel = require('../models/game.model');
const wss = require('../socket');
const { validateWord } = require('../../utils/dictionary');
const { getRandomWord } = require('../../utils/randomWord');
const { createGame } = require('./createGame.controller'); // Import createGame controller

const newWord = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body

        const { roomId, word, useRandomWord } = req.body;
        console.log('roomId:', roomId, 'word:', word, 'useRandomWord:', useRandomWord); // Log the extracted variables

        let game = await GameModel.findOne({ roomId });
        console.log('Game found:', game); // Log the game found

        if (!game) {
            // If game doesn't exist, create a new game
            console.log('Game not found, creating a new game');
            await createGame(req, res);
            game = await GameModel.findOne({ roomId });
            if (!game) {
                return res.status(500).json({ message: 'Failed to create game', success: false });
            }
        }

        let selectedWord = word;
        let hint = '';

        if (useRandomWord) {
            const result = await getRandomWord();
            console.log('Random word result:', result); // Log the result from getRandomWord
            selectedWord = result.word;
            hint = result.meaning;
        } else {
            const result = await validateWord(word);
            console.log('Validate word result:', result); // Log the result from validateWord
            if (!result.isValid) {
                return res.status(400).json({ message: 'Invalid word', success: false });
            }
            selectedWord = result.word;
            hint = result.meaning;
        }

        if (!selectedWord) {
            console.error('Error: selectedWord is undefined');
            return res.status(500).json({ message: 'Internal server error', success: false });
        }

        game.currentWord = selectedWord;
        game.guessedLetters = [];
        game.incorrectGuesses = 0;
        game.gameStarted = true;
        game.hint = hint;
        await game.save();

        const message = {
            type: 'gameStarted',
            word: selectedWord.replace(/./g, '_'),
            hint: hint,
            currentTurn: game.currentTurn
        };

      //  wss.broadcast(roomId, message);
        res.status(200).json({ message: 'New word set successfully', success: true, hint: hint });
    } catch (err) {
        console.error('Error in newWord controller:', err); // Log the error details
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    newWord
};