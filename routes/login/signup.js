'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const db = require('../../services/database');
const encodeJWT = require('../../services/jwt').encode;

const schema = {
   body: {
      username:   Joi.string().min(3).required(),
   	password:   Joi.string().min(6).required(),
   	repassword: Joi.string().min(6).required(),
   }
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
