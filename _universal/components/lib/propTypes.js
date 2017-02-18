import React from 'react'; // eslint-disable-line no-unused-vars
import { isNumber } from 'lodash';

const imageSrc = React.PropTypes.shape({
	url: React.PropTypes.string.isRequired
});

const propTypes = {
	aria: React.PropTypes.shape({}),
	bemClass: React.PropTypes.shape({
		base: React.PropTypes.func.isRequired,
		element: React.PropTypes.func.isRequired,
		modifiers: React.PropTypes.func.isRequired
	}),
	image: React.PropTypes.shape({
		altText: React.PropTypes.string,
		defaultImage: imageSrc,
		smallImage: imageSrc,
		mediumImage: imageSrc,
		largeImage: imageSrc
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
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, value must be a number between ${ min } and ${ max }.`);
			}
		};
	},
	whitelist (values = []) {

		return (props, propName, componentName) => {

			const value = props[propName];

			if (!values.includes(value)) {
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }, must be a whitelisted value.`);
			}
		};
	}
};

export default propTypes;