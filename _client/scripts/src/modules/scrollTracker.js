import { remove } from 'lodash';
import raf from 'modules/raf';

const callbacks = [];

if (process.env.CLIENT) {

	window.addEventListener('scroll', raf(() => {

		callbacks.forEach((callback) => {
			callback(getScrollPos());
		});
	}));
}

function getScrollPos () {

	if (process.env.CLIENT) {

		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		};
	}

	return null;
}

export function addScrollListener (callback) {

	if (!callbacks.includes(callback)) {
		callbacks.push(callback);
	}
}

export function removeScrollListener (callback) {

	remove(callbacks, callback);
}