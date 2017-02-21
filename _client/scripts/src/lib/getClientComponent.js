// import React from 'react';
import upperFirst from 'lodash/upperFirst';

// const upperFirst = (str) => {
//     return `${ str.charAt(0).toUpperCase() }${ str.slice(1) }`;
// }

// TODO: Remove 'System' references, these have been deprecated.
export default function getClientComponent (componentId) {

	if (!componentId) {
		return Promise.reject(new Error('Cannot load module, componentId is undefined.'));
	}

	// return Promise.resolve(() => { return(<div>test</div>); });

	// return import('components/Hero');

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