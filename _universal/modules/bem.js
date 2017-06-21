import { partial } from 'lodash';
import combineClasses from 'modules/combineClasses';
import ensureArray from 'modules/ensureArray';

function setElement (base, element) {
	return `${ base }__${ element }`;
}

function setModifiers (base, modifiers) {

	const bemModifiers = ensureArray(modifiers);

	return combineClasses(base, ...bemModifiers.map((modifier) => {
		return `${ base }--${ modifier }`;
	})).join(' ');
}

export default function bem (base = '') {

	return {
		base: () => {
			return base;
		},
		element: partial(setElement, base),
		modifiers: partial(setModifiers, base)
	};
}
