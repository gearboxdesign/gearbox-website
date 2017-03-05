import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/MainNavList';

const TWEEN_DURATION = 0.5,
	HIDDEN_CLASS = 'is-hidden';

let TweenLite;

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
	TweenLite = require('gsap').TweenLite;
}

/* eslint-enable */

class MainNav extends React.PureComponent {

	constructor (props) {

		super(props);

		this.toggleHiddenClass = this.toggleHiddenClass.bind(this);
	}

	componentDidMount () {

		const { navActive } = this.props;

		if (TweenLite) {
			TweenLite.set(this.elem, { css: { y: navActive ? '0' : '-100%' } });
		}
	}

	componentDidUpdate (prevProps) {

		const { navActive } = this.props,
			{ navActive: prevNavActive } = prevProps;

		if (this.elem && TweenLite && navActive !== prevNavActive) {

			if (navActive) {
				this.toggleHiddenClass(navActive);
			}

			/* eslint-disable no-magic-numbers */
			TweenLite.to(this.elem, TWEEN_DURATION, {
				css: { yPercent: navActive ? 0 : -100 },
				onComplete: () => { this.toggleHiddenClass(navActive); }
			});

			/* eslint-enable */
		}
	}

	toggleHiddenClass (state) {

		if (this.elem) {

			const fn = state ? this.elem.classList.remove : this.elem.classList.add;

			fn.call(this.elem.classList, HIDDEN_CLASS);
		}
	}

	render () {

		const { aria, id, className, items, navActive } = this.props,
			ariaAttrs = getAriaAttrs(Object.assign({}, aria, {
				expanded: navActive,
				hidden: !navActive
			}));

		return (
			<nav
				className={ className }
				id={ id }
				ref={ (elem) => { this.elem = elem; } } // eslint-disable-line react/jsx-no-bind
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
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired,
	navActive: React.PropTypes.bool
};

export default BemClasses(MainNav);