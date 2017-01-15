'use strict';

const pg = require('pg');
const config = require('../config');

const Pool = pg.Pool;
const db = new Pool(config.postgre);

db.connect((err, client, done) => {
   if(err) throw err;
   done();
});

module.exports = db;
