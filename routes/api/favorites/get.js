'use strict';

const db = require('../../../services/database');

function handler(req, res) {

   console.log('in get favorites');

   const query = `
      SELECT video
      FROM favorites
      WHERE userid = ${req.decodedUser.id}
   `;

	db.query(query, (err, result) => {

      console.log(err);
      console.log(result);

      result.rows.forEach(video => {
         console.log(video);
      })
		/*if (err) {
			return res.status(400).end('An error occured');
		}

      delete result.rows[0].password;
      const user = result.rows[0];
      const token = encodeJWT(user);

		res.end(token);*/

	});

}

module.exports = {
	handler
};
