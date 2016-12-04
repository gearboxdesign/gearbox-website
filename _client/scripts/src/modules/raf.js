export default function raf (fn) {

	if (process.env.CLIENT) {

		if (window.requestAnimationFrame) {

			return (...args) => {

				window.requestAnimationFrame(() => {
					fn.apply(this, args);
				});
			};
		}
	}

	return fn;
}