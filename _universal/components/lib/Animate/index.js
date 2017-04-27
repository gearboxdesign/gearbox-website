import React from 'react'; // eslint-disable-line no-unused-vars
import { flow as fFlow, trim as fTrim, map as fMap, split as fSplit } from 'lodash/fp';
import { ANIMATION_DELAY } from 'constants/animations';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const getAnimationModifiers = fFlow(fSplit(','), fMap(fTrim));

class Animate extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			isAnimated: true
		};

		this.transitionEndHandler = this.transitionEndHandler.bind(this);
	}

	componentDidMount () {

		this.inner.addEventListener('animationend', this.transitionEndHandler, {
			once: true
		});
	}

	componentWillUnmount () {

		this.inner.removeEventListener('animationend', this.transitionEndHandler);
	}

	transitionEndHandler () {

		this.setState({
			isAnimated: false
		});
	}

	render () {

		const { bemClass, children, index, type } = this.props,
			{ isAnimated } = this.state,
			cssClass = bemClass.modifiers(getAnimationModifiers(type)),
			styles = {
				'animationDelay': `${ index * ANIMATION_DELAY }s`
			};

		return (
			<div className={ isAnimated ? `${ cssClass } is-animated` : cssClass }>

				<div
					className={ bemClass.element('inner') }
					ref={ (element) => { this.inner = element; } } // eslint-disable-line react/jsx-no-bind
					style={ styles }
				>
					{ children }
				</div>

			</div>
		);
	}
}

const AnimateWrapped = BemClasses(Animate);

AnimateWrapped.FADE = 'fade';
AnimateWrapped.SCALE = 'scale';
AnimateWrapped.SLIDE_UP = 'slide, slide-up';
AnimateWrapped.SLIDE_DOWN = 'slide, slide-down';
AnimateWrapped.SLIDE_LEFT = 'slide, slide-left';
AnimateWrapped.SLIDE_RIGHT = 'slide, slide-right';

Animate.defaultProps = {
	className: 'c-animate',
	index: 0,
	type: AnimateWrapped.FADE
};

Animate.propTypes = {
	bemClass: propTypes.bemClass,
	children: React.PropTypes.node.isRequired,
	index: React.PropTypes.number.isRequired,
	type: propTypes.whitelist([
		AnimateWrapped.FADE,
		AnimateWrapped.SLIDE_UP,
		AnimateWrapped.SLIDE_DOWN,
		AnimateWrapped.SLIDE_LEFT,
		AnimateWrapped.SLIDE_RIGHT,
		AnimateWrapped.SCALE
	])
};

export default AnimateWrapped;