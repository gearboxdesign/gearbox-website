import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import MainNav from 'components/MainNav';

if (process.env.CLIENT) {
	require('./styles.scss');
}

function Footer (props) {

	const { bemClass, className, navigation } = props;

	return (
		<footer className={ className }>
			<Link activeClassName={ 'is-active' }
				className={ bemClass.element('link') }
				to="/"
			>
				Home
			</Link>
			<MainNav items={ navigation } />
		</footer>
	);
}

Footer.defaultProps = {
	className: 'c-footer'
};

Footer.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navigation: React.PropTypes.array.isRequired
};

export default BemClasses(Footer);