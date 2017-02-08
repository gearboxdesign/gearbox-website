import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import MainNavListItem from 'components/MainNavListItem';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function MainNavList (props) {

	const { className, items } = props;

	return (
		<ul className={ className }>
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
	className: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired
};

export default BemClasses(MainNavList);