'use strict';

const { get } = require('lodash'),
	createViewModel = require('lib/createViewModel');

module.exports = function getViewModel (options = {}) {

	return (entriesData) => {

		return createViewModel(get(entriesData, 'items[0]'), options);
	};
};