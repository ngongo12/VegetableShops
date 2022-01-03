const socketIo = require('socket.io');
const io = socketIo();
const messageController = require('../controllers/message');

var socketAPI = {};

socketAPI.io = io;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

socketAPI.sendMessage = async (token, msg, sendTo) => {
    const result = await messageController.createMessage(msg);
    //console.log(result);
    io.sockets.emit(token, { msg: result });
    if (sendTo) {
        io.sockets.emit(sendTo, 'new')
    }
}

io.on('updateSeenProduct', (res) => {
    console.log('updateSeenProduct' ,res);
})

module.exports = socketAPI;