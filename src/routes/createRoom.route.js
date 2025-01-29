const { createRoom } = require('../controllers/createRoom.controller');
const router = require('express').Router();

router.post('/create-room', createRoom);

module.exports = router;