'use strict';

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require('./config');
const setGlobalMiddlewares = require('./config/middlewares');
const socketController = require('./sockets');
const routes = require('./routes');

// use uws instead of ws
io.engine.ws = new (require('uws').Server)({
   noServer: true,
   perMessageDeflate: false
});

// set global middlewares
setGlobalMiddlewares(app);

// route controller
app.use(routes);

// socket controller
socketController(io);

// start http server
server.listen(config.server.port, () => {
   console.log('server listen on port ' + config.server.port);
});
