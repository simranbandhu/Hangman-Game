const { newWord } = require('../controllers/newWord.controller');
const router = require('express').Router();

router.post('/new-word', newWord);

module.exports = router;