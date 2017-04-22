'use strict';

const server = require('http').createServer();
const io = require('socket.io')(server);
const config = require('./config');
const socketController = require('./sockets');

io.engine.ws = new (require('uws').Server)({
   noServer: true,
   perMessageDeflate: false
});

socketController(io);

server.listen(config.server.port, (err) => {
   if (err) throw err;
   console.log(`server listening on port: ${config.server.port}`);
});
