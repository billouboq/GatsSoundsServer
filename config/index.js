'use strict';

const fs = require('fs');

module.exports = {
	server: {
		port: 1234
	},
	redis: {
      host: '127.0.0.1',
      port: '6379'
	},
   jwt: {
      secret: fs.readFileSync('./certificates/key.pem', 'utf8'),
      verifyKey: fs.readFileSync('./certificates/publicKey', 'utf8'),
      algo: 'RS256',
   },
	postgre: {
		user: 'bill',
		password: 'gatsbill',
		database: 'gatssounds',
		host: 'localhost',
		port: 5432,
	}
};
