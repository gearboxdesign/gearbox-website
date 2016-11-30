import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import propTypes from 'components/lib/propTypes';
import MainNav from 'components/MainNav';
import BemClasses from 'components/hoc/BemClasses';

if (process.env.CLIENT) {
	require('./styles.scss');
}

function Header (props) {

	const { bemClass, className, navigation } = props;

	return (
		<header className={ className }>
			<Link activeClassName={ 'is-active' }
				className={ bemClass.element('link') }
				to="/"
			>
				Home
			</Link>
			<MainNav items={ navigation } />
		</header>
	);
}

Header.defaultProps = {
	className: 'c-header'
};

Header.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navigation: React.PropTypes.array.isRequired
};

export default BemClasses(Header);