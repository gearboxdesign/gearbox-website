export default function getAriaAttrs (attrs = {}) {

	return Object.keys(attrs).reduce((attrsObj, key) => {

		return Object.assign({}, attrsObj, {
			[`aria-${ key }`]: attrs[key]
		});

	}, {});
}