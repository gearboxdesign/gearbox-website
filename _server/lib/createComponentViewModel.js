'use strict';

const uuid = require('uuid');

module.exports = function createComponentViewModel (componentId, props = {}) {

	return Object.assign({
		meta: {
			componentId,
			// TODO: Investigate cache implications of this.
			id: uuid.v1()
		}
	}, props);
};