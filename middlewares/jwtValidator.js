'use strict';

const decodeJWT = require('../services/jwt').decode;
const db = require('../services/database');

module.exports = function (req, res, next) {

   const token = req.header('Authorization');

   if (!token) {
      return res.status(403).end();
   }

   decodeJWT(token, (err, data) => {

      if (err) {
         return res.status(403).end();
      }

      const query = `
         SELECT *
         FROM users
         WHERE id = ${data.id}
         LIMIT 1
      `;

      db.query(query, (err, result) => {

         if (err || !result.rowCount) {
            return res.status(403).end();
         }

         req.decodedUser = result.rows[0];

         next();

      });

   });

}
