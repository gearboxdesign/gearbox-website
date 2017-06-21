import raf from 'modules/raf';

let callbacks = [];

if (process.env.CLIENT) {

	window.addEventListener('scroll', raf(() => {

		callbacks.forEach((callback) => {
			callback(getScrollPos());
		});
	}));
}

export function getScrollPos () {

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
		callbacks = callbacks.concat(callback);
	}
}

export function removeScrollListener (callback) {

	callbacks = callbacks.filter((currentCallback) => {
		return currentCallback !== callback;
	});
}