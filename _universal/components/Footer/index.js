import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Footer (props) {

	const { bemClass, className } = props;

	return (
		<footer className={ className }>
			<Link
				activeClassName={ 'is-active' }
				className={ bemClass.element('link') }
				to="/"
			>
				Home
			</Link>
		</footer>
	);
}

Footer.defaultProps = {
	className: 'c-footer'
};

Footer.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired
};

export default BemClasses(Footer);