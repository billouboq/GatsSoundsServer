'use strict';

const redis = require('redis');
const config = require('../config');

module.exports = redis.createClient(config.redis);

// exemples
/*
redis.rpush(['frameworks', 'angularjs', 'backbone'], function (err, reply) {
	if (err) throw err;
	redis.lrange('frameworks', 0, -1, function (err, reply) {
		if (err) throw err;
		console.log(reply); // ['angularjs', 'backbone']
      redis.lrem('frameworks', -1, 'backbone', function(err) {
         if (err) throw err;
         redis.lrange('frameworks', 0, -1, function (err, reply) {
      		if (err) throw err;
      		console.log(reply); // ['angularjs', 'backbone']
            redis.del('frameworks', function (err) {
               if (err) throw err;
               redis.lrange('frameworks', 0, -1, function (err, reply) {
            		if (err) throw err;
            		console.log(reply); // ['angularjs', 'backbone']
            	});
      		});
      	});
      });
	});
});

/*
