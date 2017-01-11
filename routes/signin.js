'use strict';

const db = require('../database');

module.exports = function (req, res) {

   console.log('signin');

   db.query('SELECT * FROM users', function (err, result) {

   });

}
