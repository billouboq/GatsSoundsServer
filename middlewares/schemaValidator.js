'use strict';

const util = require('util');

module.exports = function (schema) {
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
