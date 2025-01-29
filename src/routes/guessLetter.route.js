const { guessLetter } = require('../controllers/guessLetter.controller');
const router = require('express').Router();

router.post('/guess-letter', guessLetter);

module.exports = router;