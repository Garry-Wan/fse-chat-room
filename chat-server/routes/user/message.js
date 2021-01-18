const express = require('express');
const app = require("../../app")
const msg = express();
const db = require('../../model/creatdb');
const util = require("../../common/util");
const moment = require("../../common/moment")
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

var onlineUsers = [];

var onlineCount = 0;
io.on('connection', function (conn) {
    conn.on('login', function (obj) {
        console.log(obj.username + ' join in  chat room');
        conn.name = obj.username
        var index =util.findElem(onlineUsers, "name", conn.name)
        if (index == -1) {
            var arr=new Object()
            {
                name:""
                date:""
            };
            arr.name = conn.name;
            arr.date = moment().format('h:mm:ss')
            onlineUsers.push(arr)
            let jsonOnlineUsers = JSON.stringify(onlineUsers)
            onlineCount++;
            console.log('user connection ' + jsonOnlineUsers);
            io.emit('loginInfo', jsonOnlineUsers)
        }
    });
    conn.on('disconnect', function () {
        var index =util.findElem(onlineUsers, "name", conn.name)
        if (index !=-1) {
            onlineUsers = onlineUsers.filter((item)=>item.name!=conn.name);
            // let index = util.findElem(onlineUsers, "name", conn.name)
            // // var obj = {username: onlineUsers[conn.name]};
            // console.log('user disconnection ' + onlineUsers)
            // delete onlineUsers[index];
            let jsonOnlineUsers = JSON.stringify(onlineUsers)
            console.log('disconnection user connection' + jsonOnlineUsers)
            io.emit('loginInfo', jsonOnlineUsers)
        }
    });
    conn.on('sendMsg', function (data) {

        io.emit('receiveMsg', data)
        db.createMsg(data, (err, doc) => {
            if (err) {
                console.log(err.message)
                //        res.send(JSON.stringify(util.failMessage(err.message)))
            } else {
                // res.send(JSON.stringify(util.success(null)))
                console.log(data.username + "  msg data success")
            }
        })
    })
});


server.listen('8002', () => {
    console.log('init websocket')
    console.log('open Browser on http://localhost:8002')
})


msg.get('/findAllMsg', ((req, res) => {
    db.findAllMsg((err, doc) => {
        if (err) {
            res.send(JSON.stringify(util.failMessage(err.message)))
        } else {
            res.send(JSON.stringify(util.success(doc)))
        }
    })
}))

module.exports = msg


// var onlineUsers = {
// };
// var onlineCount = 0;
// io.on('connection', function (conn) {
//     conn.on('login', function (obj) {
//         console.log(obj.username + ' join in  chat room');
//         conn.name = obj.username
//         if (!onlineUsers.hasOwnProperty(conn.name)) {
//             onlineUsers[conn.name] = conn.name;
//             onlineCount++;
//             console.log('user connection ' + onlineUsers[conn.name]);
//             console.log('user connection number:   ' + onlineCount)
//             io.emit('loginInfo',onlineUsers)
//         }
//     });
//     conn.on('disconnect', function () {
//         if (onlineUsers.hasOwnProperty(conn.name)) {
//             var obj = {username: onlineUsers[conn.name]};
//             console.log('user disconnection ' + onlineUsers[conn.name])
//             delete onlineUsers[conn.name];
//             onlineCount--;
//             console.log('disconnection user connection number:' + onlineCount)
//             io.emit('loginInfo',onlineUsers)
//         }
//     });
//     conn.on('sendMsg', function (data) {
//
//         io.emit('receiveMsg', data)
//         db.createMsg(data, (err, doc) => {
//             if (err) {
//                 console.log(err.message)
//                 //        res.send(JSON.stringify(util.failMessage(err.message)))
//             } else {
//                 // res.send(JSON.stringify(util.success(null)))
//                 console.log(data.username + "msg data success")
//             }
//         })
//     })
// });
//
//
// server.listen('8002', () => {
//     console.log('init websocket')
//     console.log('open Browser on http://localhost:8002')
// })
//
//
// msg.get('/findAllMsg', ((req, res) => {
//     db.findAllMsg((err, doc) => {
//         if (err) {
//             res.send(JSON.stringify(util.failMessage(err.message)))
//         } else {
//             res.send(JSON.stringify(util.success(doc)))
//         }
//     })
// }))
//
// module.exports = msg

