'use strict';

const db = require('../services/database');
const decodeJWT = require('../services/jwt').decode;

/**
 * API validator
 *
 * This middleware verify Authorization header,
 * check if the jwt token has an id property
 * then check if there is an user with this id in the database
 * finaly it adds users'properties in req.user
 */
module.exports = function (req, res, next) {

   const token = req.header('Authorization');

   if (!token) {
      return res.status(403).end();
   }

   decodeJWT(token, (err, payload) => {

      if (err || !payload.id) {
         return res.status(403).end();
      }

      const query = `
         SELECT
            *
         FROM users
         WHERE id = $1
         LIMIT 1
      `;

      const values = [
         payload.id
      ];

      db.query(query, values, (err, result) => {

         if (err || !result.rowCount) {
            return res.status(403).end();
         }

         req.user = result.rows[0];

         next();

      });

   });

}
