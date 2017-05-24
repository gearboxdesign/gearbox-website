import React from 'react';
import { isNumber } from 'lodash';

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
	minMax (min, max) {

		return (props, propName, componentName) => {

			const value = props[propName];

			if (!isNumber(value) || value < min || value > max) {
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, value must be a number between ${ min } and ${ max }.`); // eslint-disable-line max-len
			}
		};
	},
	quote: React.PropTypes.shape({
		from: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired
	}),
	whitelist (values = []) {

		return (props, propName, componentName) => {

			const value = props[propName];

			if (!values.includes(value)) {
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, must be a whitelisted value.`); // eslint-disable-line max-len
			}
		};
	}
};

export default propTypes;