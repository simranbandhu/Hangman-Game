const { createGame } = require('../controllers/createGame.controller');
const router = require('express').Router();

router.post('/create-game', createGame);

module.exports = router;