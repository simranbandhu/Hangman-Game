const RoomModel = require('../models/rooms.models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const createRoom = async (req, res) => {
    try {
        const { password } = req.body;
        const roomId = uuidv4();
        const roomData = { roomId };

        if (password) {
            roomData.password = await bcrypt.hash(password, 10);
        }

        const room = new RoomModel(roomData);
        await room.save();

        res.status(201).json({ roomId, message: 'Room created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    createRoom
};