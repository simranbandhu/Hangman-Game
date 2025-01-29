const express = require('express');
const bodyParser = require('body-parser');
// const AuthRouter = require('./routes/AuthRouter');
// const ProductRouter = require('./routes/ProductRouter');
// const createRoomRoute = require('./routes/createRoom.route');
// const joinRoomRoute = require('./routes/joinRoom.route');
// const guessLetterRoute = require('./routes/guessLetter.route');
// const newWordRoute = require('./routes/newWord.route');
const wss = require('./socket');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
// app.use('/rooms',createRoomRoute);
// app.use('/rooms', joinRoomRoute);
// app.use('/rooms', guessLetterRoute);
// app.use('/rooms', newWordRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)});