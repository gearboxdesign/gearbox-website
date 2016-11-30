import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/MainNavList';
import propTypes from 'components/lib/propTypes';

function MainNav (props) {

	const { bemClass, className, items } = props;

	return (
		<nav className={ className }>
			<MainNavList items={ items } />
		</nav>
	);
}

MainNav.defaultProps = {
	className: 'c-main-nav'
};

MainNav.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired
};

export default BemClasses(MainNav);