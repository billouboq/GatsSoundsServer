'use strict';

const Joi = require('joi');
const db = require('../../../services/database');

const schema = {
   body: {
      id: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		date: Joi.string().required(),
		duration: Joi.number().required(),
		author: {
			name: Joi.string().required(),
			picture: Joi.string().required()
		},
		thumbnail: {
			small: Joi.string().required(),
			medium: Joi.string().required(),
			large: Joi.string().required()
		}
   }
};

function handler(req, res) {

   const query = `
      INSERT INTO favorites
      VALUES ($1, $2)
   `;

   const values = [
		req.user.id,
		req.body,
	];

	db.query(query, values, (err, result) => {

      if (err) {
			return res.status(400).end('An error occured');
		}

      res.end();

	});

}

module.exports = {
	schema,
	handler
};
