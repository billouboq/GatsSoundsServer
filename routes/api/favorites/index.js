'use strict';

const express = require('express');
const router = express.Router();

// middlewares
const schemaValidator = require('../../../middlewares/schemaValidator');

// require routes
const get = require('./get');
const remove = require('./remove');
const save = require('./save');

// set routes
router.get('/', get.handler);
router.post('/', schemaValidator(save.schema), save.handler);
router.delete('/:id', schemaValidator(remove.schema), remove.handler);

module.exports = router;
