// require("../common/axios.js");
// document.write("<script language=javascript src=’./socket.io.js’></script>");
//localhost
// let baseUrl = 'http://localhost:8001'
// Aliyun
let baseUrl = 'http://119.23.203.94:8001'
const config = {
    findAll: baseUrl + '/user/login',
    loginUser: baseUrl + '/user/login',
    registerUser: baseUrl +'/user/create',
    updateUser: baseUrl + '/user/update',
    findAllMsg :baseUrl +'/message/findAllMsg',
    // localhost websocket
   // websocketConnect: 'ws://localhost:8002'
    websocketConnect: 'ws://119.23.203.94:8002'
}

// var ws = io('ws://localhost:8002');
//     ws.on('connect', function (e) {
//         console.log("server connect success");
//         ws.emit('msg', "client send");
//     })

// const ws = new WebSocket(config.websocketConnect);
// ws.onopen = function(){
//     console.log("open");
//     ws.send("hello");
// }
// ws.onmessage = function(e){
//     console.log(e.data);
// }
// ws.onclose = function(e){
//     console.log("close");
// }
// ws.onerror = function(e){
//     console.log(e.data);
// }