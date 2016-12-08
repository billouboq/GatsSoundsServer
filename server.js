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
        io.emit('video', id);
    });

    socket.on('sendPlay', () => {
        io.emit('play');
    });

    socket.on('sendPause', () => {
        io.emit('pause');
    });

    socket.on('sendStop', () => {
        io.emit('stop');
    });

});

