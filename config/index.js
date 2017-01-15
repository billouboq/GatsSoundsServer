'use strict';

const fs = require('fs');

module.exports = {
	server: {
		port: 1234
	},
	redis: {

	},
   jwt: {
      secret: fs.readFileSync('./certificate/key.pem', 'utf8'),
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
