'use strict';

const decodeJWT = require('../services/jwt');

module.exports = function (req, res, next) {
   const token = req.get('Authorization');
   console.log(token);
}
