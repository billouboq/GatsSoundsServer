'use strict';

const schemaValidator = require('../config/middlewares').schemaValidator;

const signup = require('./signup');
const signin = require('./signin');

module.exports = function (app) {
	app.post('/signup', schemaValidator(signup.schema), signup.handler);
	app.post('/signin', schemaValidator(signin.schema), signin.handler);
}
