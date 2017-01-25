'use strict';

const express = require('express');
const router = express.Router();

// middlwares
const schemaValidator = require('../middlewares/schemaValidator');
const jwtValidator = require('../middlewares/jwtValidator');

// login routes (signin / signup)
router.use('/login', require('./login'));
// api global middlewares
router.all('/api/*', jwtValidator);
// all api routes
router.use('/api/favorites', require('./api/favorites'));

module.exports = router;
