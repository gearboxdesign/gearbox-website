'use strict';

const { get, merge, omit, pick, reduce } = require('lodash'),
	logger = require('utils/logger');

module.exports = createViewModel;

const TYPE_ENTRY = 'Entry',
	TYPE_ASSET = 'Asset',
	TYPE_LINK = 'Link';

function createViewModel (entityData) {

	if (entityData) {

		const entityType = get(entityData, 'sys.type');

		if (entityType === TYPE_ENTRY) {
			return getEntryModel(entityData);
		}
		else if (entityType === TYPE_ASSET) {
			return getAssetModel(entityData);
		}
		else if (entityType === TYPE_LINK) {

			logger.info('Unresolved Link found during render.');

			return getUnresolvedLinkModel(entityData);
		}

		// NOTE: Fall through for object profiles which do not have a matching profile.
		return entityData;
	}

	throw new Error('Unable to create View Model, Entity Data is falsey.');
}

function getEntryModel ({ sys, fields }) {

	return merge({
		meta: getMetaData(sys)
	}, getEntryModelData(fields));
}

function getUnresolvedLinkModel ({ sys }) {

	return {
		meta: getMetaData(sys)
	};
}

function getAssetModel ({ sys, fields }) {

	return merge({
		meta: getMetaData(sys)
	}, getEntryModelData(merge({}, omit(fields, ['file']), get(fields, 'file'))));
}

function getMetaData (metaData) {

	return merge(pick(metaData, 'createdAt', 'updatedAt', 'id'), {
		componentId: get(metaData, 'contentType.sys.id')
	});
}

function getEntryModelData (modelData) {

	return reduce(modelData, getEntityData(modelData), {});
}

function getEntityData (modelData) {

	return (entityData, i, key) => {

		const entity = modelData[key],
			update = {};

		if (get(entity, 'sys.type')) {
			update[key] = createViewModel(entity);
		}
		else if (Array.isArray(entity)) {
			update[key] = entity.map(createViewModel);
		}
		else {
			update[key] = entity;
		}

		return merge({}, entityData, update);
	};
}
