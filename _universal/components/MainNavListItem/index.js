import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/MainNavList';
import propTypes from 'components/lib/propTypes';

if (process.env.CLIENT) {
	require('./styles.scss');
}

// TODO: Dismiss menu on click.
function MainNavListItem (props) {

	const { bemClass, childPages, className, title, url } = props,
		subNabList = childPages && <MainNavList items={ childPages } />;

	return (
		<li className={ className }>
			<Link activeClassName={ 'is-active' } 
				className={ bemClass.element('link') }
				to={ url }
			>
				{ title }
			</Link>
			{ subNabList }
		</li>
	);
}

MainNavListItem.defaultProps = {
	className: 'c-main-nav__list-item'
};

MainNavListItem.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	childPages: React.PropTypes.array.isRequired,
	title: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

export default BemClasses(MainNavListItem);