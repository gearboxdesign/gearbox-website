import React from 'react';
import { HIDDEN_CLASS } from 'constants/cssClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import BemClasses from 'components/hoc/BemClasses';
import MainNavList from 'components/ui/MainNavList';

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
			TweenLite.set(this.element, { css: { y: navActive ? '0' : '-100%' } });
		}

		this.toggleHiddenClass(navActive);
	}

	componentDidUpdate (prevProps) {

		const { navActive, transitionDuration } = this.props,
			{ navActive: prevNavActive } = prevProps;

		if (this.element && TweenLite && navActive !== prevNavActive) {

			if (navActive) {
				this.toggleHiddenClass(navActive);
			}

			/* eslint-disable no-magic-numbers */
			TweenLite.to(this.element, transitionDuration / 1000, {
				css: { yPercent: navActive ? 0 : -100 },
				onComplete: () => { this.toggleHiddenClass(navActive); }
			});

			/* eslint-enable */
		}
	}

	toggleHiddenClass (state) {

		if (this.element) {

			const fn = state ? this.element.classList.remove : this.element.classList.add;

			fn.call(this.element.classList, HIDDEN_CLASS);
		}
	}

	render () {

		const { aria, className, id, items, navActive } = this.props,
			ariaAttrs = getAriaAttrs(Object.assign({}, aria, {
				expanded: navActive
			}));

		return (
			<div
				className={ className }
				id={ id }
				ref={ (element) => { this.element = element; } } // eslint-disable-line react/jsx-no-bind
				{ ...ariaAttrs }
			>
				<nav>
					<MainNavList items={ items } />
				</nav>
			</div>
		);
	}
}

MainNav.defaultProps = {
	className: 'c-main-nav',
	transitionDuration: 500
};

MainNav.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	items: React.PropTypes.arrayOf(React.PropTypes.shape({
		title: React.PropTypes.string,
		url: React.PropTypes.string
	})).isRequired,
	navActive: React.PropTypes.bool,
	transitionDuration: React.PropTypes.number.isRequired
};

export default BemClasses(MainNav);