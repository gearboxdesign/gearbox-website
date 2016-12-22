'use strict';

const _ = require('lodash'),
	{ cloneDeep, extend, find, get, merge, partial, reduce } = require('lodash'),
	client = require('lib/contentfulClient');

const NOT_RESOLVABLE_ERROR = 'notResolvable',
	TYPE_ENTRY = 'Entry',
	TYPE_ASSET = 'Asset',
	TYPE_LINK = 'Link';

module.exports = function resolveEntries (options = {}) {

	const { includeDepth = 10, limit = 1000 } = options; // eslint-disable-line no-magic-numbers

	if (includeDepth < 1) {
		throw new Error('Resolve entries include depth must be greater or equal to 1 to avoid infinite resolution.');
	}

	function resolveEntriesData (errors) {

		/**
		 * NOTE: This is necessary to ensure that links marked as unresolvable
		 * 	do not get re-iterated on subsequent passes.
		 */
		const unresolveableLinkArr = getUnresolvableLinks(errors);

		return (entriesData) => {

			let linkArr = [];

			/**
			 * TODO: It is potentially unnecessary to create a new object, a simpler
			 * 	strategy to simply seek out links may be preferable if not direct
			 * 	mutations at this point are required.
			 */
			const reducedEntriesData = reduceEntriesData(linkArr, entriesData);

			// NOTE: Updates linkArr with unresolvable links removed to avoid unecessary requests.
			linkArr = removeUnresolveableLinks(linkArr, unresolveableLinkArr);

			if (linkArr.length) {

				return Promise.all(linkArr.map((link) => {

					return client.getEntries({
						'sys.id': get(link, 'sys.id'),
						'include': includeDepth,
						limit
					});
				}))
				.then(resolveLinks(linkArr))
				.then(() => { return reducedEntriesData; });
			}

			return reducedEntriesData;
		};
	}

	function getUnresolvableLinks (errors = []) {

		return errors.filter((error) => {
			return get(error, 'sys.id') === NOT_RESOLVABLE_ERROR;
		}).map((error) => {
			return error.details;
		});
	}

	function removeUnresolveableLinks (linkArr, unresolveableLinkArr) {

		return linkArr.filter((link) => {

			return !find(unresolveableLinkArr, (unresolvableLink) => {
				return unresolvableLink.id === get(link, 'sys.id');
			});
		});
	}

	function reduceEntriesData (linkArr, entityData) {

		if (checkEntityType(entityData)) {

			linkArr.push(entityData);

			return entityData;
		}
		else if (Array.isArray(entityData)) {
			return entityData.map(partial(reduceEntriesData, linkArr));
		}
		else if (typeof entityData === 'object') {
			return reduce(entityData, reduceEntityData(linkArr, entityData), {});
		}

		return entityData;
	}

	function reduceEntityData (linkArr, entriesData) {

		return (entityData, i, key) => {

			const entity = entriesData[key],
				update = {};

			if (checkEntityType(entity)) {
				linkArr.push(entity);
				update[key] = entity;
			}
			else if (Array.isArray(entity)) {
				update[key] = entity.map(partial(reduceEntriesData, linkArr));
			}
			else if (typeof entity === 'object') {
				update[key] = reduceEntriesData(linkArr, entity);
			}
			else {
				update[key] = entity;
			}

			return extend(entityData, update);
		};
	}

	function checkEntityType (entity) {

		const { sys } = entity;

		return sys && sys.type === TYPE_LINK && (sys.linkType === TYPE_ENTRY || sys.linkType === TYPE_ASSET);
	}

	function resolveLinks (linkArr) {

		return (linkData) => {

			const processedLinks = linkData.map(partial(get, _, 'items[0]'));
			linkArr.forEach(resolveLink(processedLinks));

			/**
			 * NOTE: Recurses back through the process for any updated links in case
			 * 	new Links were found in the updated data set.
			 */
			return Promise.all(linkArr.map((link) => {
				return resolveEntriesData(linkData.errors)(link);
			}));
		};
	}

	function resolveLink (processedLinks) {

		return (link) => {

			/**
			 * NOTE: This is a direct mutation of the original Link object,
			 * 	this presently the original fields override correctly but this may
			 * 	become and issue if the response profile is changed.
			 */
			const match = find(processedLinks, (processedLink) => {
				return get(processedLink, 'sys.id') === get(link, 'sys.id');
			});

			merge(link, match);
		};
	}

	return (entriesData) => {

		if (entriesData.items && entriesData.items.length) {

			// NOTE: Clone entries data to avoid direct mutation on the original data.
			const clonedEntriesData = cloneDeep(entriesData);

			// NOTE: Iterates through entries resolving any Links found in the supplied data set.
			return Promise.all(clonedEntriesData.items.map(resolveEntriesData(clonedEntriesData.errors)))
				.then((resolvedItems) => {

					return merge({}, clonedEntriesData, {
						items: resolvedItems
					});
				});
		}

		// NOTE: Return the original object if no items were found.
		return entriesData;
	};
};