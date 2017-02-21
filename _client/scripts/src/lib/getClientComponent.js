import { upperFirst } from 'lodash';

// TODO: Remove 'System' references, these have been deprecated.
export default function getClientComponent (componentId) {

	if (!componentId) {
		return Promise.reject(new Error('Cannot load module, componentId is undefined.'));
	}

	return import(`containers/${ upperFirst(componentId) }Container`)
		.catch((err) => {
			console.log(err);

			return import(`components/${ upperFirst(componentId) }`);
		})
		.catch((err) => {
			console.log(err);

			return import(`components/${ upperFirst(componentId) }/index`);
		});
}