'use strict';

const pg = require('pg');
const config = require('../config');

const Pool = pg.Pool;
const db = new Pool(config.postgre);

module.exports = db;
