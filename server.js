'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const config = require('./config');
const socketController = require('./sockets')
const routeController = require('./routes');

// set middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// use uws instead of ws
io.engine.ws = new (require('uws').Server)({
   noServer: true,
   perMessageDeflate: false
});

// routes controller
routeController(app);

// socket controller
socketController(io);

// start http server
server.listen(config.server.port, () => {
   console.log('server listen on port ' + config.server.port);
});
