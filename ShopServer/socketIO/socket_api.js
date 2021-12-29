const socketIo = require('socket.io');
const io = socketIo();

var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

socketAPI.sendMessage = (token, msg) => {
    io.sockets.emit(token, { msg });
}

module.exports = socketAPI;