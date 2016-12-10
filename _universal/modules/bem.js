import { trim, partial } from 'lodash';
import ensureArray from 'modules/ensureArray';

function setElement (base, element) {
	return `${ base }__${ element }`;
}

function setModifiers (base, modifiers) {

	const bemModifiers = ensureArray(modifiers);

	return trim(`${ base } ${ bemModifiers.map((modifier) => {
		return `${ base }--${ modifier }`;
	}).join(' ') }`);
}

function setSubElement (element, subElement) {
	return `${ element }-${ subElement }`;
}

export default function bem (base = '') {

	return {
		base: () => {
			return base;
		},
		element: partial(setElement, base),
		modifiers: partial(setModifiers, base),
		subElement: setSubElement
	};
}
