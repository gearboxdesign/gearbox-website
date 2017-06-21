import React from 'react';
import { get } from 'lodash';
import combineClasses from 'modules/combineClasses';
import bem from 'modules/bem';
import ensureArray from 'modules/ensureArray';

export default function (Component, options = {}) {

	function BemClasses (props) {

		const { classes, modifiers, ...componentProps } = props; // eslint-disable-line no-unused-vars

		const combinedClasses = (ensureArray(options.classes)).concat(ensureArray(classes)),
			combinedModifiers = (ensureArray(options.modifiers)).concat(ensureArray(modifiers));

		const bemClass = bem(options.baseClass || get(Component, 'defaultProps.className')),
			bemClassName = bemClass ?
				combineClasses(bemClass.modifiers(combinedModifiers), ...combinedClasses).join(' ') :
				combinedClasses.join(' ');

		return (
			<Component
				bemClass={ bemClass }
				className={ bemClassName }
				{ ...componentProps }
			/>
		);
	}

	BemClasses.propTypes = {
		classes: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.string
		]),
		modifiers: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.string),
			React.PropTypes.string
		])
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	BemClasses.displayName = `bemClasses(${ componentName })`;

	BemClasses.wrappedComponent = Component;

	return BemClasses;
}