import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

function Error (props) {

	const { aria, errors, className } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<h2>Error</h2>
			<ul>
				{ errors.map(getError) }
			</ul>
		</div>
	);
}

function getError (err) {

	return <li>{ err }</li>;
}

Error.defaultProps = {
	className: 'c-error'
};

Error.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	errors: React.PropTypes.array.isRequired
};

export default BemClasses(Error);