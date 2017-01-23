'use strict';

const bcrypt = require('bcrypt');
const db = require('../services/database');
const encodeJWT = require('../services/jwt').encode;

const schema = {
	username: {
      in: 'body',
		notEmpty: true,
		errorMessage: 'Invalid username'
	},
	password: {
      in: 'body',
		notEmpty: true,
		isLength: {
			options: [{
				min: 6,
				max: undefined
			}],
		},
		errorMessage: 'Invalid password'
	},
};

function handler(req, res) {

   const query = `
      SELECT id, password
      FROM users
      WHERE username = '${req.body.username}'
   `;

	db.query(query, (err, result) => {

		if (err) {
			return res.status(400).end('An error occured');
		}

      if (!result.rowCount) {
         return res.status(400).end('Wrong username or password');
      }

      if (!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
         return res.status(400).end('Wrong username or password');
      }

      const token = encodeJWT(result.rows[0].id);

		res.end(token);

	});

}

module.exports = {
	schema,
	handler
};
