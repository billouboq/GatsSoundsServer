'use strict';

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require('./config');
const middlewares = require('./config/middlewares');
const socketController = require('./sockets');
const routeController = require('./routes');

// use uws instead of ws
io.engine.ws = new (require('uws').Server)({
   noServer: true,
   perMessageDeflate: false
});

// set global middlewares
middlewares.setGlobal(app);

// route controller
routeController(app);

// socket controller
socketController(io);

// start http server
server.listen(config.server.port, () => {
   console.log('server listen on port ' + config.server.port);
});
