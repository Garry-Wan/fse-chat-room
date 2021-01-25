const express = require('express');
const app = require("../../app")
const msg = express();
const db = require('../../model/creatdb');
const util = require("../../common/util");
const moment = require("../../common/moment")
const websocket = require("../../common/websocketUtil")
const server = require('http').Server(app)
const io = websocket.init(server)
var onlineUsers = [];
var onlineCount = 0;
websocket.onConnection(io, (conn) => {
    websocket.bindEvent(conn, 'login', (obj) => {
        console.log(obj.username + ' join in  chat room');
        conn.name = obj.username
        var index = util.findElem(onlineUsers, "name", conn.name)
        if (index == -1) {
            var arr = new Object()
            {
                name:""
                date:""
            }
            ;
            arr.name = conn.name;
            arr.date = moment().format('h:mm:ss')
            onlineUsers.push(arr)
            let jsonOnlineUsers = JSON.stringify(onlineUsers)
            onlineCount++;
            console.log('user connection ' + jsonOnlineUsers);
            websocket.emit(io, 'loginInfo', jsonOnlineUsers)
            // io.emit('loginInfo', jsonOnlineUsers)
        }
    });
    websocket.bindEvent(conn, 'disconnect', () => {
        var index = util.findElem(onlineUsers, "name", conn.name)
        if (index != -1) {
            onlineUsers = onlineUsers.filter((item) => item.name != conn.name);
            let jsonOnlineUsers = JSON.stringify(onlineUsers)
            console.log('disconnection user connection' + jsonOnlineUsers)
            websocket.emit(io, 'loginInfo', jsonOnlineUsers)
            //        io.emit('loginInfo', jsonOnlineUsers)
        }
    });
    websocket.bindEvent(conn, 'sendMsg', (data) => {
        websocket.emit(io, 'receiveMsg', data)
        //    io.emit('receiveMsg', data)
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
    // conn.on('sendMsg', function (data) {
    //     io.emit('receiveMsg', data)
    //     db.createMsg(data, (err, doc) => {
    //         if (err) {
    //             console.log(err.message)
    //             //        res.send(JSON.stringify(util.failMessage(err.message)))
    //         } else {
    //             // res.send(JSON.stringify(util.success(null)))
    //             console.log(data.username + "  msg data success")
    //         }
    //     })
    // })
})
// io.on('connection', function (conn) {
//     conn.on('login', function (obj) {
//         console.log(obj.username + ' join in  chat room');
//         conn.name = obj.username
//         var index =util.findElem(onlineUsers, "name", conn.name)
//         if (index == -1) {
//             var arr=new Object()
//             {
//                 name:""
//                 date:""
//             };
//             arr.name = conn.name;
//             arr.date = moment().format('h:mm:ss')
//             onlineUsers.push(arr)
//             let jsonOnlineUsers = JSON.stringify(onlineUsers)
//             onlineCount++;
//             console.log('user connection ' + jsonOnlineUsers);
//             io.emit('loginInfo', jsonOnlineUsers)
//         }
//     });
//     conn.on('disconnect', function () {
//         var index =util.findElem(onlineUsers, "name", conn.name)
//         if (index !=-1) {
//             onlineUsers = onlineUsers.filter((item)=>item.name!=conn.name);
//             let jsonOnlineUsers = JSON.stringify(onlineUsers)
//             console.log('disconnection user connection' + jsonOnlineUsers)
//             io.emit('loginInfo', jsonOnlineUsers)
//         }
//     });
//     conn.on('sendMsg', function (data) {
//         io.emit('receiveMsg', data)
//         db.createMsg(data, (err, doc) => {
//             if (err) {
//                 console.log(err.message)
//                 //        res.send(JSON.stringify(util.failMessage(err.message)))
//             } else {
//                 // res.send(JSON.stringify(util.success(null)))
//                 console.log(data.username + "  msg data success")
//             }
//         })
//     })
// });

//
// server.listen('8002', () => {
//     console.log('init websocket')
//     console.log('open Browser on http://localhost:8002')
// })


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

