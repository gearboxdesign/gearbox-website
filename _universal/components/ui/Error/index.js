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

	const { aria, bemClass, className, errors } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<h2 className={ bemClass.element('heading') }>Error</h2>
			<ul className={ bemClass.element('list') }>
				{ errors.map(getErrorItem(bemClass)) }
			</ul>
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
	errors: React.PropTypes.array.isRequired
};

export default BemClasses(Error);