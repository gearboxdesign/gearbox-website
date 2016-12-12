import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import propTypes from 'components/lib/propTypes';
import Logo from 'components/Logo';
import MainNav from 'components/MainNav';
import BemClasses from 'components/hoc/BemClasses';
import ToggleButton from 'components/Buttons/ToggleButton';

if (process.env.CLIENT) {
	require('./styles.scss');
}

function Header (props) {

	const { bemClass, className, navigation, navActive, toggleNavHandler } = props,
		mainNavId = 'main-nav';

	return (
		<header className={ className }>
			<div className={ bemClass.element('inner') }>
				<Link activeClassName={ 'is-active' }
					className={ bemClass.element('logo') }
					to="/"
				>
					<Logo />
				</Link>
				<ToggleButton 
					aria={ {
						controls: mainNavId
					} }
					active={ navActive }
					classes={ bemClass.element('toggle') }
					modifiers= { ['invert', 'menu-toggle'] }
					clickHandler={ toggleNavigation(navActive, toggleNavHandler) }
					label='Toggle Navigation'
				/>
				<MainNav classes={ bemClass.element('nav') }
					id={ mainNavId }
					items={ navigation }
					navActive={ navActive }
				/>
			</div>
		</header>
	);
}

function toggleNavigation (navActive, toggleNavHandler) {

	return (evt) => {
		return toggleNavHandler(!navActive);
	};
}

Header.defaultProps = {
	className: 'c-header'
};

Header.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navigation: React.PropTypes.array.isRequired,
	navActive: React.PropTypes.bool.isRequired,
	toggleNavHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Header);