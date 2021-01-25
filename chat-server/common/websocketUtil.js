const websocket ={}

websocket.init = (server) =>{
    server.listen('8002', () => {
        console.log('init websocket')
        console.log('open Browser on http://localhost:8002')
    })
    return require('socket.io')(server, {
        cors: {
            origin: '*',
        }
    });
}

websocket.onConnection = (io,callback) =>{
    io.on('connection',callback)
}
websocket.bindEvent = (conn, event, callback) =>{
    conn.on(event,callback)
}
websocket.emit = (io,event,data) =>{
    io.emit(event,data)
}
module.exports = websocket