import { upperFirst } from 'lodash';

export default function (componentId) {

	if (!componentId) {
		throw new Error('Cannot load module, componentId is undefined.');
	}

	try {
		return require(`containers/${ upperFirst(componentId) }Container`).default; // eslint-disable-line global-require, max-len
	}
	catch (err) {
		return require(`components/${ upperFirst(componentId) }`).default; // eslint-disable-line global-require
	}
}