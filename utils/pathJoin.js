'use strict';

const { flowRight, spread } = require('lodash'),
	path = require('path'),
	slash = require('slash');

module.exports = flowRight(slash, spread(path.join.bind(path)), function () {
	return Array.prototype.slice.call(arguments);
});
