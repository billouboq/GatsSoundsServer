'use strict';

module.exports = function (app) {
   app.post('/login',  require('./login'));
   app.post('/signin', require('./signin'));
   app.get('/verify',  require('./verify'));
}
