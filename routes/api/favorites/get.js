'use strict';

const db = require('../../../services/database');

function handler(req, res) {

   const query = `
      SELECT video
      FROM favorites
      WHERE userid = $1
   `;

   const values = [
      req.user.id
   ];

	db.query(query, values, (err, result) => {

      if (err) {
			return res.status(400).end('An error occured');
		}

      // {video: data} to data
      const flattenedArray = [];

      for (let i = 0; i < result.rows.length; i++) {
         flattenedArray.push(result.rows[i].video);
      }

		res.json(flattenedArray);

	});

}

module.exports = {
	handler
};
