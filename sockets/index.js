'use strict';

const socketioJwt = require('socketio-jwt');
const redis = require('../services/redis');
const config = require('../config');

module.exports = function (io) {

   // socket jwt middleware
   io.on('connection', socketioJwt.authorize({
   	secret: config.jwt.verifyKey,
      algorithms: [config.jwt.algo],
      decodedPropertyName: 'decodedToken',
   	timeout: 20000,
   }));

   // once authenticated you can send and receive sockets
   io.on('authenticated', (socket) => {

		console.log('connected & authenticated: ' + JSON.stringify(socket.decodedToken));

      listenTo('test', function(io, socket, data) {
         console.log(data);
         console.log('test');
      });

      listenTo('an other test', (io, socket, data) => {
         console.log(data);
         console.log('an other test');
      });

      function listenTo(key, callback) {
         socket.on(key, (data) => {
            callback(socket, {socket, key, io, data});
         });
      }

	});

}
