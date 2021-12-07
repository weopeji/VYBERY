const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    ips: [String],
    socketId: String,
    data: JSON,
    Actions: JSON,
});

mongoose.model('User', UserShema);