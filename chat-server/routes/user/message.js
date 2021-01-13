const express = require('express')

const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)
//online user
var onlineUsers = {};
//online user number
var onlineCount = 0;

io.on('connection', function (conn) {
    console.log('server websocket')
    conn.on('msg', function (obj) {
        console.log('msg', obj);
    });
});

server.listen('8001', () => {
    console.log('init websocket')
    console.log('open Browser on http://localhost:8001')
})

