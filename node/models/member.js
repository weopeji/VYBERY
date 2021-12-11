const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    type: String,
    id_guruleads: String,
    img: String,
    data: JSON,
});

mongoose.model('Member', UserShema);