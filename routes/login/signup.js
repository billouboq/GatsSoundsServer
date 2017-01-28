'use strict';

const bcrypt = require('bcrypt');
const db = require('../../services/database');
const encodeJWT = require('../../services/jwt').encode;

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
			options: [{min: 6, max: undefined}],
		},
		errorMessage: 'Invalid password'
	},
	repassword: {
      in: 'body',
		notEmpty: true,
		isLength: {
			options: [{min: 6, max: undefined}],
		},
		errorMessage: 'Invalid password'
	},
};

function handler(req, res) {

	if (req.body.password !== req.body.repassword) {
		return res.status(400).end('Invalid password');
	}

	const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id, username
   `;

	const values = [
		req.body.username,
		bcrypt.hashSync(req.body.password, 10),
	];

	db.query(query, values, (err, result) => {

      if (err) {
         return res.status(400).end('An error occured');
      }

      const token = encodeJWT(result.rows[0]);

      res.end(token);

	});

}

module.exports = {
	schema,
	handler
};
