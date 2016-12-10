import React from 'react';
import { get, trim } from 'lodash';
import bem from 'modules/bem';
import ensureArray from 'modules/ensureArray';

export default function (Component, opts = {}) {

	function BemClasses (props) {

		const { classes, modifiers, ...componentProps } = props; // eslint-disable-line no-unused-vars

		const combinedClasses = (ensureArray(opts.classes)).concat(ensureArray(classes)),
			combinedModifiers = (ensureArray(opts.modifiers)).concat(ensureArray(modifiers));

		const bemClass = bem(opts.baseClass || get(Component, 'defaultProps.className')),
			bemClassName = bemClass ?
				trim(`${ bemClass.modifiers(combinedModifiers) } ${ combinedClasses.join(' ') }`) :
				combinedClasses.join(' ');

		return (
			<Component bemClass={ bemClass }
				className={ bemClassName }
				{ ...componentProps }
			/>
		);
	}

	BemClasses.propTypes = {
		classes: React.PropTypes.any,
		modifiers: React.PropTypes.any
	};

	return BemClasses;
}