const WebSocket = require('ws');
const GameModel = require('./models/game.model');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws, req) => {
    const roomId = req.url.split('/').pop();
    ws.roomId = roomId;
    console.log(req.url);
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        const game = await GameModel.findOne({ roomId });

        if (data.type === 'startGame') {
            game.currentWord = data.word;
            game.guessedLetters = [];
            game.incorrectGuesses = 0;
            game.gameStarted = true;
            await game.save();
            broadcast(roomId, { type: 'gameStarted', word: game.currentWord.replace(/./g, '_') });
        } else if (data.type === 'guessLetter') {
            const letter = data.letter;
            if (!game.guessedLetters.includes(letter)) {
                game.guessedLetters.push(letter);
                if (!game.currentWord.includes(letter)) {
                    game.incorrectGuesses += 1;
                }
                await game.save();
                broadcast(roomId, {
                    type: 'updateGame',
                    guessedLetters: game.guessedLetters,
                    incorrectGuesses: game.incorrectGuesses,
                    word: game.currentWord.split('').map(l => game.guessedLetters.includes(l) ? l : '_').join('')
                });
            }
        }
    });
});

function broadcast(roomId, message) {
    wss.clients.forEach(client => {
        if (client.roomId === roomId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

module.exports = wss;