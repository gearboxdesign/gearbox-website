import React from 'react';
import RouteLink from 'components/lib/RouteLink';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Logo from 'components/ui/Logo';
import MainNav from 'components/ui/MainNav';
import ToggleButton from 'components/ui/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Header (props) {

	const { aria, bemClass, className, navigation, navActive, toggleNavHandler } = props,
		ariaAttrs = getAriaAttrs(aria),
		mainNavId = 'main-nav';

	return (
		<header
			className={ className }
			{ ...ariaAttrs }
		>
			<div className={ bemClass.element('inner') }>
				<RouteLink
					activeClassName={ 'is-active' }
					className={ bemClass.element('logo') }
					to="/"
				>
					<Logo enableScroll={ true } />
				</RouteLink>
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
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navActive: React.PropTypes.bool.isRequired,
	navigation: React.PropTypes.array.isRequired,
	toggleNavHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Header);