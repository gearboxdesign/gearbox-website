import React from 'react';
import { get } from 'lodash';
import combineClasses from 'modules/combineClasses';
import bem from 'modules/bem';
import ensureArray from 'modules/ensureArray';

export default function (Component, opts = {}) {

	function BemClasses (props) {

		const { classes, modifiers, ...componentProps } = props; // eslint-disable-line no-unused-vars

		const combinedClasses = (ensureArray(opts.classes)).concat(ensureArray(classes)),
			combinedModifiers = (ensureArray(opts.modifiers)).concat(ensureArray(modifiers));

		const bemClass = bem(opts.baseClass || get(Component, 'defaultProps.className')),
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