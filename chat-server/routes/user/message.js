const express = require('express');
const app = require("../../app")
const msg = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var onlineUsers = {};

var onlineCount = 0;
io.on('connection', function (conn) {
    conn.on('login', function (obj) {
        console.log( obj.username +'join in  chat room');
        conn.name = obj.username
        if (!onlineUsers.hasOwnProperty(obj.username)) {
            onlineUsers[obj.username] = obj.username;
            onlineCount++;
            console.log('user connection '+onlineUsers[obj.username])
            console.log('user connection number:   ' + onlineCount)
        }
    });
    conn.on('disconnect', function () {
        if (onlineUsers.hasOwnProperty(conn.name)) {
            var obj= { username: onlineUsers[conn.name] };
            console.log('user disconnection '+onlineUsers[conn.name])
            delete onlineUsers[conn.name];
            onlineCount--;
            console.log('disconnection user connection number:' + onlineCount)
        }
    });
    conn.on('sendMsg', function (data) {
        io.emit('receiveMsg', data)
        console.log(data)
        // var rids = data.to.split(',')
        // for (let username of rids) {
        //     if (username) {
        //         var receiver = onlineUsers[username]
        //         if (receiver) {
        //             receiver.conn.emit('receiveMsg', data)
        //         }
        //     }
        // }
    })
});


server.listen('8002', () => {
    console.log('init websocket')
    console.log('open Browser on http://localhost:8002')
})


// msg.connect = function () {
//     io.on('connection', function (conn) {
//     console.log('server websocket connect')
//     conn.on('msg', function (obj) {
//         console.log('msg', obj);
//     });
// });
// }
module.exports = msg

