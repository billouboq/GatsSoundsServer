'use strict';

const redis = require('../services/redis');

module.exports = function (io) {

	io.on('connection', (socket) => {
		console.log('connected');

      listenTo('test', function(io, socket, data) {
         console.log(data);
         console.log('test');
      });

      listenTo('an other test', (io, socket, data) => {
         console.log(data);
         console.log('an other test');
      });

	});

   function listenTo(key, callback) {
      socket.on(key, (data) => {
         callback(io, socket, data);
      });
   }

}
