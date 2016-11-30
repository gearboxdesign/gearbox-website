'use strict';

const uuid = require('uuid');

module.exports = function createComponentModel (componentId, props = {}) {

	return Object.assign({
		meta: {
			componentId,
			// TODO: Investigate cache implications of this.
			id: uuid.v1()
		}
	}, props);
};