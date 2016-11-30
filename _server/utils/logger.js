'use strict';

const pathJoin = require('utils/pathJoin'),
	winston = require('winston');

winston.add(winston.transports.File, {
	filename: pathJoin(__dirname, '..', 'errors.log'),
	level: 'error'
});

module.exports = winston;