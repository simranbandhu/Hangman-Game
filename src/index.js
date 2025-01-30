const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const createRoomRoute = require('./routes/createRoom.route');
const joinRoomRoute = require('./routes/joinRoom.route');
const guessLetterRoute = require('./routes/guessLetter.route');
const newWordRoute = require('./routes/newWord.route');
const createGameRoute = require('./routes/createGame.route'); 


require('dotenv').config();
require('./db/index.db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/rooms',createRoomRoute);
app.use('/rooms', joinRoomRoute);
app.use('/rooms', guessLetterRoute);
app.use('/rooms', newWordRoute);
app.use('/games', createGameRoute);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})