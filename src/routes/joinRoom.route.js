const { joinRoom } = require('../controllers/joinRoom.controller');
const router = require('express').Router();

router.post('/join-room', joinRoom);

module.exports = router;