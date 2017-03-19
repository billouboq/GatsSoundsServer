'use strict';

const Joi = require('joi');

const types = [
   'body',
   'params',
   'query'
];

const validationOptions = {
   stripUnknown: true,
   convert: true
};

/**
 * Cloud middleware
 *
 * !! --- CARREFUL --- !!
 * THIS PLUGIN NEEDS TO HAVE JWTVALIDATOR SET RIGHT BEFORE IT
 * !! --- END CARREFUL --- !!
 *
 * This middleware add a cloud property to the req object.
 * This cloud property is used to list/delete/upload files.
 * See cloud service for more informations
 */
module.exports = function (schema) {

   if (!schema) {
      throw new Error('Error: schema is null or undefined');
   }

   // check if schemas have body|query|params item
   const keys = Object.keys(schema);

   for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!types.some(type => type === key)) {
         throw new Error('bad schema');
      }
   }

	return function (req, res, next) {

      for (let i = 0; i < keys.length; i++) {
         const key = keys[i];
         const validation = Joi.validate(req[key], schema[key], validationOptions);
         if (validation.error) {
            return res.status(400).json(validation.error);
         }
         req[key] = validation.value;
      }

      next();

	}

}
