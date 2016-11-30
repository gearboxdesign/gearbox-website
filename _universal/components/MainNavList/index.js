import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import MainNavListItem from 'components/MainNavListItem';

function MainNavList (props) {

	const { className, items } = props;

	return (
		<ul className={ className }>
			{ items.map(getMainNavListItem) }
		</ul>
	);
}

function getMainNavListItem (navItem, i) {

	return (
		<MainNavListItem key={ i }
			{ ...navItem }
		/>
	);
}

MainNavList.defaultProps = {
	className: 'c-main-nav__list'
};

MainNavList.propTypes = {
	className: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired
};

export default BemClasses(MainNavList);