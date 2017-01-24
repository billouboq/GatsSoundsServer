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

		const auth_timeout = setTimeout(() => {
			socket.disconnect('unauthorized');
		}, options.timeout || 5000);

		socket.on('authenticate', (data) => {

         clearTimeout(auth_timeout);

         if (!data || typeof data.token !== "string") {
            return onError('invalid token datatype');
         }

         jwt.verify(data.token, options.secret, options, onJwtVerificationReady);

         function onJwtVerificationReady(err, decoded) {

            if (err) {
               return onError('invalid_token');
            }

            socket[options.decodedPropertyName] = decoded;
            socket.emit('authenticated', decoded);
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
