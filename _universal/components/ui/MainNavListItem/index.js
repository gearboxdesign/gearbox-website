import React from 'react';
import RouteLink from 'components/lib/RouteLink';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import MainNavList from 'components/ui/MainNavList';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function MainNavListItem (props) {

	const { aria, bemClass, childPages, className, title, url } = props,
		ariaAttrs = getAriaAttrs(aria),
		subNabList = childPages && <MainNavList items={ childPages } />;

	return (
		<li
			className={ className }
			{ ...ariaAttrs }
		>
			<RouteLink
				activeClassName={ 'is-active' }
				className={ bemClass.element('link') }
				to={ url }
			>
				{ title }
			</RouteLink>
			{ subNabList }
		</li>
	);
}

MainNavListItem.defaultProps = {
	className: 'c-main-nav__list-item'
};

MainNavListItem.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	childPages: React.PropTypes.array.isRequired,
	className: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired
};

export default BemClasses(MainNavListItem);