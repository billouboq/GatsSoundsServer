'use strict';

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const morgan = require('morgan');

module.exports = function setGlobal(app) {
   app.use(cors());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(expressValidator());

   if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'));
   }
}
