'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const db = require('../../services/database');
const encodeJWT = require('../../services/jwt').encode;

const schema = {
   body: {
      username: Joi.string().min(3).required(),
      password: Joi.string().min(6).required()
   }
};

function handler(req, res) {

   const query = `
      SELECT id, username, password
      FROM users
      WHERE username = $1
   `;

   const values = [
      req.body.username
   ]

	db.query(query, values, (err, result) => {

		if (err) {
			return res.status(400).end('An error occured');
		}

      if (!result.rowCount) {
         return res.status(400).end('Wrong username or password');
      }

      if (!bcrypt.compareSync(req.body.password, result.rows[0].password)) {
         return res.status(400).end('Wrong username or password');
      }

      delete result.rows[0].password;
      const user = result.rows[0];
      const token = encodeJWT(user);

		res.end(token);

	});

}

module.exports = {
	schema,
	handler
};
