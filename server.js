'use strict';

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);
const port = 1234;

server.listen(port, () => {
    console.log('server listen on port ' + port);
});

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('sendVideo', (id) => {
        socket.broadcast.emit('video', id);
    });

    socket.on('sendPlay', () => {
        socket.broadcast.emit('play');
    });

    socket.on('sendPause', () => {
        socket.broadcast.emit('pause');
    });

    socket.on('sendStop', () => {
        socket.broadcast.emit('stop');
    });

});

