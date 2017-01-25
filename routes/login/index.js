'use strict';

const express = require('express');
const router = express.Router();

// middlewares
const schemaValidator = require('../../middlewares/schemaValidator');

// require routes
const signin = require('./signin');
const signup = require('./signup');

// set routes
router.post('/signup', schemaValidator(signup.schema), signup.handler);
router.post('/signin', schemaValidator(signin.schema), signin.handler);

module.exports = router;
