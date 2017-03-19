'use strict';

const Joi = require('joi');
const db = require('../../../services/database');

const schema = {
   params: {
      id: Joi.string().required()
   }
};

function handler(req, res) {

   const query = `
      DELETE FROM favorites
      WHERE video @> '{"id": "$1"}'
   `;

   const values = [
      req.params.id
   ];

	db.query(query, values, (err, result) => {

      if (err || !result.rowCount) {
         return res.status(400).end('An error occured');
      }

      res.end();

	});

}

module.exports = {
	schema,
	handler
};
