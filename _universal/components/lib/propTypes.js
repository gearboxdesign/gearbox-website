import React from 'react'; // eslint-disable-line no-unused-vars

const propTypes = {
	aria: React.PropTypes.shape({}),
	bemClass: React.PropTypes.shape({
		base: React.PropTypes.func.isRequired,
		element: React.PropTypes.func.isRequired,
		modifiers: React.PropTypes.func.isRequired
	}),
	whitelist (values = []) {

		return (props, propName, componentName) => {

			const value = props[propName];

			if (!values.includes(value)) {
				throw new Error(`Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }.`); 
			}
		};
	}
};

export default propTypes;