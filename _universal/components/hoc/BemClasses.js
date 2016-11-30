import React from 'react';
import bem from 'modules/bem';
import { get, trim } from 'lodash';

export default function (Component, opts = {}) {

	function BemClasses (props) {

		const { classes, modifiers, ...componentProps } = props; // eslint-disable-line no-unused-vars

		const combinedClasses = (opts.classes || []).concat(classes || []),
			combinedModifiers = (opts.modifiers || []).concat(modifiers || []);

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