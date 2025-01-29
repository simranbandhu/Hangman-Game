const GameModel = require('../models/game.model');
const wss = require('../socket');

const guessLetter = async (req, res) => {
    try {
        const { roomId, letter } = req.body;
        console.log('roomId:', roomId, 'letter:', letter); // Log the extracted variables

        const game = await GameModel.findOne({ roomId });
        console.log('Game found:', game); // Log the game found

        if (!game) {
            return res.status(404).json({ message: 'Game not found', success: false });
        }

        if (game.guessedLetters.includes(letter)) {
            return res.status(400).json({ message: 'Letter already guessed', success: false });
        }

        game.guessedLetters.push(letter);

        if (!game.currentWord.includes(letter)) {
            game.incorrectGuesses += 1;
        }

        await game.save();

        const wordDisplay = game.currentWord.split('').map(l => game.guessedLetters.includes(l) ? l : '_').join('');
        const message = {
            type: 'updateGame',
            guessedLetters: game.guessedLetters,
            incorrectGuesses: game.incorrectGuesses,
            word: wordDisplay,
            currentTurn: game.currentTurn
        };

        // Check if the word has been guessed
        if (wordDisplay === game.currentWord) {
            message.type = 'gameWon';
            message.message = 'Congratulations! You have guessed the word!';
            message.word = game.currentWord;
        }

        // Check if the incorrect guess limit has been exceeded
        if (game.incorrectGuesses >= game.maxIncorrectGuesses) {
            message.type = 'gameLost';
            message.message = 'You lose! The word was ' + game.currentWord;
            message.word = game.currentWord;
        }

        //wss.broadcast(roomId, message);

        res.status(200).json({
            message: 'Letter guessed successfully',
            success: true,
            wordDisplay: wordDisplay,
            incorrectGuesses: game.incorrectGuesses,
            guessedLetters: game.guessedLetters,
            gameStatus: message.type === 'gameWon' ? 'won' : message.type === 'gameLost' ? 'lost' : 'inProgress'
        });
    } catch (err) {
        console.error('Error in guessLetter controller:', err); // Log the error details
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    guessLetter
};