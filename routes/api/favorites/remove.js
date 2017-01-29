'use strict';

const Joi = require('joi');
const db = require('../../../services/database');

const schema = {
   query: {
      id: Joi.string().required()
   }
};

function handler(req, res) {

   const query = `
      DELETE FROM favorites
      WHERE video @> '{"id": "${req.query.id}"}'
   `;

	db.query(query, (err, result) => {

		console.log(err);
      console.log(result);

	});

}

module.exports = {
	schema,
	handler
};
