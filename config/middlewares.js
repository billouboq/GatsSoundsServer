'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

module.exports = function setGlobal(app) {

   app.use(compression());
   app.use(cors());
	app.use(bodyParser.json());

   if (process.env.NODE_ENV !== 'production') {
      app.use(morgan('dev'));
   }

}
