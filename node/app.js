const express                       = require('express');
const app                           = express();
const mongoose                      = require('mongoose');
const bodyParser                    = require('body-parser');
const request                       = require('request')

const models                        = require('./models');

const Member                        = mongoose.model('Member');  
const News                          = mongoose.model('News'); 
const User                          = mongoose.model('User'); 

var secure, server;

if(process.platform == 'win32') {secure = false} else {secure = true};

if (secure)
{
    console.log('Server now!');
    server = require('http').createServer(app);
    params = {
        transports: ['websocket', 'polling'],
    }
    io          = require("socket.io")(server, params);
} else
{
    console.log('localhost now!');
    params = {
        cors: { 
            origin: "http://localhost",
            methods: ["GET", "POST"]
        }
    }
    server      = require('http').createServer(app);
    io          = require("socket.io")(server, params);
}

mongoose.connect("mongodb://127.0.0.1:27017/vyberi_store", { useNewUrlParser: true, useUnifiedTopology: true })
    .then( function() { 
        console.log(`Mongo Db Connect`);
        server.listen(3000,
            () => {
                console.log(`Занят на сервере 3000 порт...`);
                load_helpers();
            }
        );
    })
    .catch(err => console.error(`Error`, err));


var components_html = null;

var load_helpers = () =>
{
    if(components_html == null) 
    {
        components_html = require('./types/main');
        components_html.init({
            request: request,
            Member: Member,
            News: News,
            User: User,
        });
    }
}

var components_page = function components_page(socket,data,callback)
{
    if(components_html)
    {
        components_html.components_page(socket,data,callback);
    }
}

io.on('connection', function(socket) {

    socket.on('components', function(data, callback) {
        components_page(this, data, callback);
    });
});