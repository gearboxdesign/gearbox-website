import React from 'react';
import { isNumber, isString } from 'lodash';

const imageSrcShape = React.PropTypes.shape({
	url: React.PropTypes.string.isRequired,
	sizes: React.PropTypes.string,
	widths: React.PropTypes.array
});

const propTypes = {
	// TODO: Add valid ARIA props.
	aria: React.PropTypes.shape({}),
	asyncState: React.PropTypes.shape({
		data: React.PropTypes.any,
		errors: React.PropTypes.array,
		loading: React.PropTypes.bool.isRequired
	}),
	bemClass: React.PropTypes.shape({
		base: React.PropTypes.func.isRequired,
		element: React.PropTypes.func.isRequired,
		modifiers: React.PropTypes.func.isRequired
	}),
	image: React.PropTypes.shape({
		altText: React.PropTypes.string,
		defaultImage: imageSrcShape.isRequired,
		smallImage: imageSrcShape,
		mediumImage: imageSrcShape,
		largeImage: imageSrcShape
	}),
	link: React.PropTypes.shape({
		label: React.PropTypes.string.isRequired,
		url: React.PropTypes.string.isRequired
	}),
	meta: React.PropTypes.shape({
		componentId: React.PropTypes.string.isRequired,
		createdAt: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,
		updatedAt: React.PropTypes.string.isRequired
	}),
	requiredWith (propNames) {

		const propArr = isString(propNames) ? [propNames] : propNames;

		return (props, propName, componentName) => {

			const value = props[propName];

			if (value && Array.includes(propArr.map((prop) => {
				return !!props[prop];
			}), false)) {
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, '${ propName }' prop is only required with prop(s) '${ propArr.join(', ') }'.`); // eslint-disable-line max-len
			}
		};
	},
	range (min, max) {

		if (!isNumber(min) || !isNumber(max)) {
			throw new TypeError('"min" and "max" arguments must be numbers.');
		}

		return (props, propName, componentName) => {

			const value = props[propName];

			if (!isNumber(value) || value < min || value > max) {
				throw new RangeError(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, value must be a number between ${ min } and ${ max }.`); // eslint-disable-line max-len
			}
		};
	},
	quote: React.PropTypes.shape({
		from: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired
	})
};

export default propTypes;