'use strict';

const uuid = require('uuid');

module.exports = function createComponentViewModel (componentId, props = {}) {

	return Object.assign({
		meta: {
			componentId,
			id: uuid.v1()
		}
	}, props);
};