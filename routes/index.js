'use strict';

const express = require('express');
const router = express.Router();

// middlwares
const schemaValidator = require('../middlewares/schemaValidator');
const jwtValidator = require('../middlewares/jwtValidator');

// login routes (signin / signup)
router.use('/login', require('./login'));

// all api routes
router.all('/api/*', jwtValidator);
router.use('/api/favorites', require('./api/favorites'));

module.exports = router;
