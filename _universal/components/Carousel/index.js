import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Carousel (props) {

	const { aria, bemClass, children, className, currentSlideIndex, peek, setSlideIndexHandler } = props,
		ariaAttrs = getAriaAttrs(aria),
		slideCount = React.Children.count(children),
		slideWidth = 100 / slideCount,
		slideContainerWidth = slideCount * (100 - (peek * 2)),
		slidePeekOffset = (peek / slideContainerWidth) * 100,
		slidePos = ((slideWidth * currentSlideIndex) * -1) + slidePeekOffset;

	return (
		<div className={ className }>
			<div
				className={ bemClass.element('container') }
				style={ {
					width: `${ slideContainerWidth }%`, // eslint-disable-line no-magic-numbers
					transform: `translateX(${ slidePos }%)` // eslint-disable-line no-magic-numbers
				} }
			>
				{ React.Children.map(children, getCarouselChild(bemClass.element('item'))) }
			</div>
			<button
				onClick={ getSlideIndexHandler(setSlideIndexHandler, currentSlideIndex - 1) } // eslint-disable-line no-magic-numbers
				type="button"
			>
				Previous Slide
			</button>
			<button
				onClick={ getSlideIndexHandler(setSlideIndexHandler, currentSlideIndex + 1) } // eslint-disable-line no-magic-numbers
				type="button"
			>
				Next Slide
			</button>
		</div>
	);
}

function getSlideIndexHandler (setSlideIndexHandler, index) {

	return () => { setSlideIndexHandler(index); };
}

function getCarouselChild (className) {

	return (childElement, i) => {

		// TODO: Smart merge classes into existing classes prop if present. NOTE: this could be an Array or a String.
		return React.cloneElement(childElement, {
			classes: className,
			index: i
		});
	};
}

Carousel.defaultProps = {
	className: 'c-carousel',
	peek: 0
};

// TODO: Validate peek prop so it is no greater than 50.
Carousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	currentSlideIndex: React.PropTypes.number.isRequired,
	peek: propTypes.minMax(0, 49),
	setSlideIndexHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Carousel);