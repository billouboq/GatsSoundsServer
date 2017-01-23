'use strict';

const util = require('util');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const morgan = require('morgan');

module.exports = {
	setGlobal,
	schemaValidator
}

function setGlobal(app) {
   app.use(cors());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(expressValidator());

   if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'));
   }
}

function schemaValidator(schema) {
	return function (req, res, next) {
		req.check(schema);
		req.getValidationResult().then(function (result) {
			if (!result.isEmpty()) {
				return res.status(400).end('Validation errors: ' + util.inspect(result.array()));
			}
			next();
		});
	}
}
