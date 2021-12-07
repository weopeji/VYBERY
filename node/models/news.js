const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    data: JSON,
    time: String,
});

mongoose.model('News', UserShema);