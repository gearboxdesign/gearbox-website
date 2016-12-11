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

	const { bemClass, className, navigation, navState, setNavStateHandler } = props,
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
					active={ navState }
					classes={ bemClass.element('toggle') }
					modifiers= { ['invert', 'menu-toggle'] }
					clickHandler={ toggleNavigation(navState, setNavStateHandler) }
					label='Toggle Navigation'
				/>
				<MainNav classes={ bemClass.element('nav') }
					id={ mainNavId }
					items={ navigation }
					navState={ navState }
				/>
			</div>
		</header>
	);
}

function toggleNavigation (navState, setNavStateHandler) {

	return (evt) => {
		return setNavStateHandler(!navState);
	};
}

Header.defaultProps = {
	className: 'c-header'
};

Header.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	navigation: React.PropTypes.array.isRequired,
	navState: React.PropTypes.bool.isRequired,
	setNavStateHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Header);