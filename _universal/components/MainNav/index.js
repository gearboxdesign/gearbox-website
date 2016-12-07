import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/MainNavList';
import propTypes from 'components/lib/propTypes';

const TWEEN_DURATION = 1;

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
			TweenLite.to(this.nav, TWEEN_DURATION, { css: { yPercent: navState ? 0 : -100 } });
		}
	}

	render () {

		const { bemClass, className, items } = this.props;

		return (
			<nav className={ className }
				ref={ (nav) => { this.nav = nav; } }
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
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired,
	navState: React.PropTypes.bool
};

export default BemClasses(MainNav);