import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import propTypes from 'components/lib/propTypes';
import Logo from 'components/Logo';
import MainNav from 'components/MainNav';
import BemClasses from 'components/hoc/BemClasses';
import ToggleButton from 'components/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Header (props) {

	const { bemClass, className, navigation, navActive, toggleNavHandler } = props,
		mainNavId = 'main-nav';

	return (
		<header className={ className }>
			<div className={ bemClass.element('inner') }>
				<Link
					activeClassName={ 'is-active' }
					className={ bemClass.element('logo') }
					to="/"
				>
					<Logo />
				</Link>
				<ToggleButton
					active={ navActive }
					aria={ {
						controls: mainNavId
					} }
					classes={ bemClass.element('toggle') }
					clickHandler={ toggleNavigation(navActive, toggleNavHandler) }
					label="Toggle Navigation"
					modifiers={ ['invert', 'menu-toggle'] }
				/>
				<MainNav
					classes={ bemClass.element('nav') }
					id={ mainNavId }
					items={ navigation }
					navActive={ navActive }
				/>
			</div>
		</header>
	);
}

function toggleNavigation (navActive, toggleNavHandler) {

	return () => {
		return toggleNavHandler(!navActive);
	};
}

Header.defaultProps = {
	className: 'c-header'
};

Header.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navActive: React.PropTypes.bool.isRequired,
	navigation: React.PropTypes.array.isRequired,
	toggleNavHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Header);