import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */
class Carousel extends React.Component {

	constructor (props) {

		super(props);

		this.state = {
			isInTransition: false
		};
	}

	componentWillReceiveProps (nextProps) {

		const { currentSlideIndex: nextSlideIndex } = nextProps,
			{ currentSlideIndex, transitionDuration } = this.props;

		if (nextSlideIndex !== currentSlideIndex) {

			this.setState({
				isInTransition: true
			});

			setTimeout(() => {

				this.setState({
					isInTransition: false
				});

			}, transitionDuration * 1000); // eslint-disable-line no-magic-numbers
		}
	}

	getCarouselChild (className) {

		return (childElement, i) => {

			const { currentSlideIndex, transitionDuration } = this.props,
				isActive = i === currentSlideIndex;

			// TODO: Smart merge classes into existing classes prop if present. NOTE: this could be an Array or a String.
			return React.cloneElement(childElement, {
				aria: {
					hidden: !isActive
				},
				classes: [className].concat(isActive ? ['is-active'] : []),
				index: i,
				transitionDuration
			});
		};
	}

	setSlideIndex (indexShift) {

		const { setSlideIndexHandler, currentSlideIndex } = this.props;

		return () => {

			setSlideIndexHandler(currentSlideIndex + indexShift);
		};
	}

	render () {

		// TODO: Add ARIA, such as controls.
		// TODO: Replace buttons with ToggleButton.
		const { aria,
				bemClass,
				children,
				className,
				currentSlideIndex,
				peek,
				transitionDuration,
				transitionEase
			} = this.props,
			{ isInTransition } = this.state,
			ariaAttrs = getAriaAttrs(aria),
			slideCount = React.Children.count(children),
			slideWidth = 100 / slideCount, // eslint-disable-line no-magic-numbers
			slideContainerWidth = slideCount * (100 - (peek * 2)), // eslint-disable-line no-magic-numbers
			slidePeekOffset = (peek / slideContainerWidth) * 100, // eslint-disable-line no-magic-numbers
			slidePos = ((slideWidth * currentSlideIndex) * -1) + slidePeekOffset; // eslint-disable-line no-magic-numbers

		return (
			<div
				className={ `${ className } ${ isInTransition ? 'is-in-transition' : '' }` }
				{ ...ariaAttrs }
			>
				<div
					className={ bemClass.element('container') }
					style={ {
						width: `${ slideContainerWidth }%`, // eslint-disable-line no-magic-numbers
						transform: `translateX(${ slidePos }%)`, // eslint-disable-line no-magic-numbers,
						transition: `transform ${ transitionDuration }s ${ transitionEase }`
					} }
				>
					{ React.Children.map(children, this.getCarouselChild(bemClass.element('item'))) }
				</div>
				<button
					onClick={ this.setSlideIndex(-1) } // eslint-disable-line no-magic-numbers
					type="button"
				>
					Previous Slide
				</button>
				<button
					onClick={ this.setSlideIndex(1) } // eslint-disable-line no-magic-numbers
					type="button"
				>
					Next Slide
				</button>
			</div>
		);
	}

}

Carousel.defaultProps = {
	className: 'c-carousel',
	peek: 0,
	transitionDuration: 0.25,
	transitionEase: 'ease-out'
};

Carousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	currentSlideIndex: React.PropTypes.number.isRequired,
	peek: propTypes.minMax(0, 49), // eslint-disable-line no-magic-numbers
	setSlideIndexHandler: React.PropTypes.func.isRequired,
	transitionDuration: React.PropTypes.number.isRequired,
	transitionEase: React.PropTypes.string.isRequired
};

export default BemClasses(Carousel);