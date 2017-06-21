import raf from 'modules/raf';

let callbacks = [];

if (process.env.CLIENT) {

	window.addEventListener('resize', raf(() => {

		callbacks.forEach((callback) => {
			callback(getViewportDimensions());
		});
	}));
}

export function getViewportDimensions () {

	if (process.env.CLIENT) {

		return {
			innerWidth: window.innerWidth,
			innerHeight: window.innerHeight,
			outerWidth: window.outerWidth,
			outerHeight: window.outerHeight
		};
	}

	return null;
}

export function addResizeListener (callback) {

	if (!callbacks.includes(callback)) {
		callbacks = callbacks.concat(callback);
	}
}

export function removeResizeListener (callback) {

	callbacks = callbacks.filter((currentCallback) => {
		return currentCallback !== callback;
	});
}