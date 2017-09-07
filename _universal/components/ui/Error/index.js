import { get } from 'lodash';
import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Error (props) {

	const { aria, bemClass, className, error } = props,
		errors = get(error, 'errors'),
		ariaAttrs = getAriaAttrs(aria);

	// TODO: Translate 'Error'.
	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<h2 className={ bemClass.element('heading') }>{ error.message || 'Error' }</h2>
			{ errors && (
				<ul className={ bemClass.element('list') }>
					{ errors.map(getErrorItem(bemClass)) }
				</ul>
			) }
		</div>
	);
}

function getErrorItem (bemClass) {

	return (err) => {
		return <li className={ bemClass.element('list-item') }>{ err }</li>;
	};
}

Error.defaultProps = {
	className: 'c-error'
};

Error.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	error: propTypes.error
};

export default BemClasses(Error);