import React from 'react'; // eslint-disable-line no-unused-vars
import { isArray, isString, trim } from 'lodash';
import bem from 'modules/bem';
import { addDragListeners, removeDragListeners } from 'modules/dragTracker';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ToggleButton from 'components/ui/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const DIRECTION_START = 'start',
	DIRECTION_END = 'end';

class Carousel extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			isDragged: false,
			isInTransition: false,
			transitionDirection: DIRECTION_START
		};

		this.startDragHandler = this.startDragHandler.bind(this);
		this.dragHandler = this.dragHandler.bind(this);
		this.endDragHandler = this.endDragHandler.bind(this);
		this.transitionEndHandler = this.transitionEndHandler.bind(this);
	}

	componentDidMount () {

		const { dragEnabled } = this.props;

		if (dragEnabled) {

			addDragListeners(this.wrapper, {
				start: this.startDragHandler,
				drag: this.dragHandler,
				end: this.endDragHandler
			});
		}

		this.wrapper.addEventListener('transitionend', this.transitionEndHandler);
	}

	componentWillReceiveProps (nextProps) {

		const { currentSlideIndex: nextSlideIndex } = nextProps,
			{ currentSlideIndex } = this.props;

		if (nextSlideIndex !== currentSlideIndex) {

			this.setState({
				isInTransition: true,
				transitionDirection: nextSlideIndex < currentSlideIndex ? DIRECTION_START : DIRECTION_END
			});
		}
	}

	componentWillUnmount () {

		const { dragEnabled } = this.props;

		if (dragEnabled) {

			removeDragListeners(this.wrapper);

		}

		this.wrapper.removeEventListener('transitionend', this.transitionEndHandler);
	}

	startDragHandler () {

		this.container.style.transition = 'none';

		this.setState({
			isDragged: true
		});
	}

	dragHandler (evt) {

		const { children, currentSlideIndex, peek, dragFactor } = this.props,
			slideCount = React.Children.count(children);

		this.container.style.transform = this.getSlideContainerTransform(
			slideCount,
			currentSlideIndex,
			peek,
			evt.dragX * dragFactor
		);
	}

	endDragHandler (evt) {

		const { currentSlideIndex,
				children,
				dragThreshold,
				peek,
				setSlideIndexHandler,
				transitionDuration,
				transitionEase
			} = this.props,
			{ shiftX } = evt,
			slideCount = React.Children.count(children);

		this.container.style.transition = this.getSlideContainerTransition(transitionDuration, transitionEase);

		this.setState({
			isDragged: false
		}, () => { // eslint-disable-line consistent-return

			if (shiftX < (dragThreshold * -1) || shiftX > dragThreshold) {

				const newSlideIndex = currentSlideIndex + (shiftX > 0 ? 1 : -1);

				if (newSlideIndex >= 0 && newSlideIndex < slideCount) {
					return setSlideIndexHandler(newSlideIndex);
				}
			}

			this.container.style.transform = this.getSlideContainerTransform(slideCount, currentSlideIndex, peek);
		});
	}

	transitionEndHandler () {

		this.setState({
			isInTransition: false
		});
	}

	getCarouselChild (className) {

		return (childElement, i) => {

			const { currentSlideIndex, transitionDuration } = this.props,
				isActive = i === currentSlideIndex;

			/**
			 * NOTE: Checks if the current childElement props is present, if it is a string
			 *	it is converted to an array ready for additional classes.
			**/
			let { classes } = childElement.props;
			classes = isArray(classes) ? classes : isString(classes) ? [classes] : [];

			return React.cloneElement(childElement, {
				aria: {
					hidden: !isActive
				},
				classes: classes.concat(className).concat(isActive ? ['is-active'] : []),
				index: i,
				transitionDuration
			});
		};
	}

	getCarouselControls (id, className) {

		const { children, currentSlideIndex } = this.props,
			slideCount = React.Children.count(children),
			bemClass = bem(className);

		return [(
			<ToggleButton
				aria={ {
					controls: id
				} }
				classes={ bemClass.modifiers('prev') }
				clickHandler={ this.setSlideIndex(-1) } // eslint-disable-line no-magic-numbers
				disabled={ currentSlideIndex === 0 }
				key={ 'prev-button' }
				label="Previous Slide"
			/>
		), (
			<ToggleButton
				aria={ {
					controls: id
				} }
				classes={ bemClass.modifiers('next') }
				clickHandler={ this.setSlideIndex(1) } // eslint-disable-line no-magic-numbers
				disabled={ currentSlideIndex === (slideCount - 1) }
				key={ 'next-button' }
				label="Next Slide"
			/>
		)];
	}

	getSlideContainerTransform (slideCount, currentSlideIndex, peek, offset = 0) {

		/* eslint-disable no-magic-numbers */
		const slideWidth = 100 / slideCount,
			slideContainerWidth = this.getSlideContainerWidth(slideCount, peek),
			slidePeekOffset = (peek / slideContainerWidth) * 100,
			slideOffset = (offset * slideWidth) * -1,
			slidePos = ((slideWidth * currentSlideIndex) * -1) + slidePeekOffset + slideOffset;

		/* eslint-enable */

		return `translateX(${ slidePos }%)`;
	}

	getSlideContainerTransition (duration, ease) {

		return (`transform ${ duration }s ${ ease }`);
	}

	getSlideContainerWidth (slideCount, peek) {

		return slideCount * (100 - (peek * 2)); // eslint-disable-line no-magic-numbers
	}

	setSlideIndex (indexShift) {

		const { setSlideIndexHandler, currentSlideIndex } = this.props;

		return (evt) => {

			evt.stopPropagation();

			setSlideIndexHandler(currentSlideIndex + indexShift);
		};
	}

	render () {

		const { aria,
				bemClass,
				children,
				className,
				currentSlideIndex,
				id,
				peek,
				showControls,
				transitionDuration,
				transitionEase
			} = this.props,
			{ isDragged, isInTransition, transitionDirection } = this.state,
			ariaAttrs = getAriaAttrs(aria),
			slideCount = React.Children.count(children),
			dragClass = isDragged ? 'is-dragged' : '',
			transitionClass = isInTransition ? `is-in-transition transition-direction-${ transitionDirection }` : '';

		return (
			<div
				className={ trim(`${ className } ${ dragClass } ${ transitionClass }`) }
				id={ id }
				{ ...ariaAttrs }
			>
				<div
					className={ bemClass.element('wrapper') }
					ref={ (element) => { this.wrapper = element; } } // eslint-disable-line react/jsx-no-bind
				>
					<div
						className={ bemClass.element('container') }
						ref={ (element) => { this.container = element; } } // eslint-disable-line react/jsx-no-bind
						style={ {
							width: `${ this.getSlideContainerWidth(slideCount, peek) }%`,
							transform: this.getSlideContainerTransform(slideCount, currentSlideIndex, peek),
							transition: this.getSlideContainerTransition(transitionDuration, transitionEase)
						} }
					>
						{ React.Children.map(children, this.getCarouselChild(bemClass.element('item'))) }
					</div>
				</div>
				{ showControls && this.getCarouselControls(id, bemClass.element('control-button')) }
			</div>
		);
	}
}

Carousel.defaultProps = {
	className: 'c-carousel',
	dragEnabled: true,
	dragFactor: 0.5,
	dragThreshold: 30,
	peek: 0,
	showControls: true,
	transitionDuration: 0.5,
	transitionEase: 'ease-out'
};

Carousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	currentSlideIndex: React.PropTypes.number.isRequired,
	dragEnabled: React.PropTypes.bool.isRequired,
	dragFactor: React.PropTypes.number.isRequired,
	dragThreshold: React.PropTypes.number.isRequired,
	id: React.PropTypes.string.isRequired,
	peek: propTypes.minMax(0, 49), // eslint-disable-line no-magic-numbers
	setSlideIndexHandler: React.PropTypes.func.isRequired,
	showControls: React.PropTypes.bool.isRequired,
	transitionDuration: React.PropTypes.number.isRequired,
	transitionEase: React.PropTypes.string.isRequired
};

export default BemClasses(Carousel);