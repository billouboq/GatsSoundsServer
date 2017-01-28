'use strict';

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
		client.lpush(key, JSON.stringify(obj), (err) => {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	});
}

function pop(key) {
	return new Promise((resolve, reject) => {
		client.rpop(key, function (err, reply) {
			if (err) {
				return reject(err);
			}
			if (reply) {
            try {
               reply = JSON.parse(reply);
            } catch(e) {}
			}
			resolve(null, reply);
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
            try {
               parsedArray.push(JSON.parse(reply[i]))
            } catch(e) {
               continue;
            }
         }
			resolve(parsedArray);
		});
	})
}

function remove(key) {
	return new Promise((resolve, reject) => {
		client.del(key, function (err) {
			if (err) {
				return reject(err);
			}
			resolve();
		});
	})
}
