const express = require('express');
const app=require("../../app")
const msg = express();

const server = require('http').Server(app)

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

server.listen('8002', () => {
    console.log('init websocket')
    console.log('open Browser on http://localhost:8002')
})


msg.connect = function () {
    io.on('connection', function (conn) {
    console.log('web server websocket')
    conn.on('msg', function (obj) {
        console.log('msg', obj);
    });
});
}
module.exports = msg

