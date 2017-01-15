'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
   encode
}

function encode(data) {
   return jwt.sign(data, config.jwt.secret, { algorithm: config.jwt.algo });
}
