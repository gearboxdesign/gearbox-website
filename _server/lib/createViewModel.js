'use strict';

const { get, merge, omit, pick, reduce } = require('lodash'),
	logger = require('utils/logger');

const TYPE_ENTRY = 'Entry',
	TYPE_ASSET = 'Asset',
	TYPE_LINK = 'Link';

module.exports = function createViewModel (rootEntityData, options = {}) {

	const { entryTransformers = [] } = options;

	function transformEntry (entryViewModel, transformer) {

		return transformer(entryViewModel);
	}

	function getViewModel (entityData) {

		if (entityData) {

			const entityType = get(entityData, 'sys.type');

			if (entityType === TYPE_ENTRY) {

				const entryViewModel = getEntryModel(entityData),
					transformedEntryViewModel = entryTransformers.reduce(transformEntry, entryViewModel);

				/**
				 * NOTE: Attempts to transform the resolved ViewModel,
				 *	if this does not return an object with a 'meta' property
				 * 	(indicating this is not a valid ViewModel) then the original
				 *	ViewModel will be used in its place.
				 */
				return get(transformedEntryViewModel, 'meta') ? transformedEntryViewModel : entryViewModel;
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
				update[key] = getViewModel(entity);
			}
			else if (Array.isArray(entity)) {
				update[key] = entity.map(getViewModel);
			}
			else {
				update[key] = entity;
			}

			return merge({}, entityData, update);
		};
	}

	return getViewModel(rootEntityData);
};