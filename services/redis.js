'use strict';

const Promise = require('bluebird');
const redis = require('redis');
const config = require('../config');
const client = redis.createClient(config.redis);

module.exports = {
	push,
	pop,
	get,
   remove
};

function push(key, obj) {
	return new Promise((resolve, reject) => {

      if (obj == null) {
         return reject(new Error('cant push null or undefined data'));
      }

      try {
         var data = JSON.stringify(obj);
      } catch(e) {
         return reject(e);
      }

		client.lpush(key, data, (err) => {
			if (err) {
				reject(err);
			} else {
            resolve();
         }
		});
	});
}

function pop(key) {
	return new Promise((resolve, reject) => {

		client.rpop(key, function (err, reply) {

			if (err) {
				return reject(err);
			}

         try {
            var data = JSON.parse(reply);
         } catch(e) {
            resolve(null, reply)
         }

			resolve(null, data);
		});
	});
}

function get(key) {
	return new Promise((resolve, reject) => {

		client.lrange(key, 0, -1, function (err, reply) {

			if (err) {
				return reject(err);
			}

         const parsedArray = [];

         for (var i = 0; i < reply.length; i++) {
            let data;

            try {
               data = JSON.parse(reply[i]);
            } catch(e) {
               data = reply[i];
            }

            parsedArray.push(data);
         }

			resolve(parsedArray);
		});
	})
}

function remove(key) {
	return new Promise((resolve, reject) => {
		client.del(key, function (err) {
			if (err) {
				reject(err);
			} else {
            resolve();
         }
		});
	})
}
