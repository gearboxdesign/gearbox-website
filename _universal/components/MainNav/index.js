import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/MainNavList';

const TWEEN_DURATION = 0.5,
	HIDDEN_CLASS = "is-hidden";

let TweenLite;

if (process.env.CLIENT) {
	require('./styles.scss');
	TweenLite = require('gsap').TweenLite;
}

class MainNav extends React.Component {

	componentDidMount () {

		const { navState } = this.props;

		if (TweenLite) {
			TweenLite.set(this.nav, { css: { y: navState ? '0' : '-100%' } });
		}
	}

	componentDidUpdate (prevProps) {

		const { navState } = this.props,
			{ navState: prevNavState } = prevProps;

		if (TweenLite && navState !== prevNavState) {

			if (navState) {
				this.toggleHiddenClass(navState);
			}

			TweenLite.to(this.nav, TWEEN_DURATION, { 
				css: { yPercent: navState ? 0 : -100 }, 
				onComplete: this.toggleHiddenClass.bind(this, navState) 
			});
		}
	}

	toggleHiddenClass (state) {

		const fn = state ? this.nav.classList.remove : this.nav.classList.add;

		fn.call(this.nav.classList, HIDDEN_CLASS);
	}

	render () {

		const { aria, id, bemClass, className, items, navState } = this.props,
			ariaAttrs = getAriaAttrs(Object.assign({}, aria, {
				expanded: navState,
				hidden: !navState
			}));

		return (
			<nav className={ className }
				id={ id }
				ref={ (nav) => { this.nav = nav; } }
				{ ...ariaAttrs }
			>
				<MainNavList items={ items } />
			</nav>
		);
	}
}

MainNav.defaultProps = {
	className: 'c-main-nav'
};

MainNav.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired,
	navState: React.PropTypes.bool
};

export default BemClasses(MainNav);