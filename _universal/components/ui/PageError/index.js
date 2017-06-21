import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import ErrorComponent from 'components/ui/Error';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Apply styling.
function PageError (props) {

	const { aria, bemClass, className, errors, heading, statusCode } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<h1 className={ bemClass.element('heading') }>{ statusCode }</h1>
			<h2 className={ bemClass.element('sub-heading') }>{ heading }</h2>
			<ErrorComponent errors={ errors } />
		</div>
	);
}

PageError.defaultProps = {
	className: 'c-page-error'
};

PageError.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	heading: React.PropTypes.string.isRequired,
	statusCode: React.PropTypes.number.isRequired
};

export default BemClasses(PageError);
