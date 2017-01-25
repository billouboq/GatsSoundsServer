'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
	encode,
	authorize
}

function encode(data) {
	return jwt.sign(data, config.jwt.secret, {algorithm: config.jwt.algo});
}

function authorize(options, onConnection) {

	const defaults = {
		decodedPropertyName: 'decoded_token'
	};

	options = Object.assign(defaults, options);

	return function (socket) {

      const server = this.server || socket.server;
      const Namespace = Object.getPrototypeOf(server.sockets).constructor;

      if (!~Namespace.events.indexOf('authenticated')) {
         Namespace.events.push('authenticated');
      }

      const auth_timeout = setTimeout(() => {
			socket.disconnect('unauthorized');
		}, options.timeout || 5000);

		socket.on('authenticate', (data) => {

         clearTimeout(auth_timeout);

         if (!data || typeof data.token !== 'string') {
            return onError('invalid token datatype');
         }

         jwt.verify(data.token, options.secret, options, onJwtVerificationReady);

         function onJwtVerificationReady(err, decoded) {

            if (err) {
               return onError('invalid_token');
            }

            socket[options.decodedPropertyName] = decoded;
            socket.emit('authenticated', decoded);

            var namespace = (server.nsps && socket.nsp && server.nsps[socket.nsp.name]) || server.sockets;

            // explicit namespace
            namespace.emit('authenticated', socket);
         }

         function onError(error) {
            socket.emit('unauthorized', error, function () {
               socket.disconnect('unauthorized');
            });
            return;
         }

      });

	};

}
