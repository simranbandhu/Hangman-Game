const RoomModel = require('../models/rooms.models');
const bcrypt = require('bcrypt');


const joinRoom = async (req, res) => {
    try {
        const { roomId, password } = req.body;
        const room = await RoomModel.findOne({ roomId });

        if (!room) {
            return res.status(404).json({ message: 'Room not found', success: false });
        }

        if (room.password) {
            const isPasswordValid = await bcrypt.compare(password, room.password);
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Invalid password', success: false });
            }
        }

        res.status(200).json({ message: 'Joined room successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    joinRoom
};