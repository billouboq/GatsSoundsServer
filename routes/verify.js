'use strict';

const db = require('../database');

module.exports = function (req, res) {

   console.log('verify');

   db.query('SELECT * FROM users', function (err, result) {

   });

}
