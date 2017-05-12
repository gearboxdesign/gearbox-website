import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import MainNavListItem from 'components/ui/MainNavListItem';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function MainNavList (props) {

	const { aria, className, items } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<ul
			className={ className }
			{ ...ariaAttrs }
		>
			{ items.map(getMainNavListItem) }
		</ul>
	);
}

function getMainNavListItem (props) {

	const { title } = props; // eslint-disable-line react/prop-types

	return (
		<MainNavListItem
			key={ title }
			{ ...props }
		/>
	);
}

MainNavList.defaultProps = {
	className: 'c-main-nav__list'
};

MainNavList.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired
};

export default BemClasses(MainNavList);