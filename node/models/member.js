const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    min_money: String,
    max_money: String,
    time: String,
    min_date: String,
    max_date: String,
    procent: String,
    id_guruleads: String,
    admin_rate: String,
    url_guruleads: String,
    img: String,
});

mongoose.model('Member', UserShema);