'use strict';

const path = require('path'),
	winston = require('winston');

winston.add(winston.transports.File, {
	filename: path.join(__dirname, '..', 'errors.log'),
	level: 'error'
});

module.exports = winston;