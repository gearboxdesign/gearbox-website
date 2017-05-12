import React from 'react';
import { get, isArray, isString } from 'lodash';
import bem from 'modules/bem';
import combineClasses from 'modules/combineClasses';
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

		const { currentSlideIndex, setSlideIndexHandler } = props;

		// NOTE: If 'setSlidIndexHandler' is not supplied then currentSlideIndex is controlled via state.
		this.state = Object.assign({
			isDragged: false,
			isInTransition: false,
			transitionDirection: DIRECTION_START
		}, !setSlideIndexHandler && { currentSlideIndex });

		this.startDragHandler = this.startDragHandler.bind(this);
		this.dragHandler = this.dragHandler.bind(this);
		this.endDragHandler = this.endDragHandler.bind(this);
		this.transitionEndHandler = this.transitionEndHandler.bind(this);
		this.getCurrentSlideIndex = this.getCurrentSlideIndex.bind(this);

		// NOTE: If 'setSlideIndexHandler' is not supplied then default 'setSlideIndex' will be used.
		if (setSlideIndexHandler) {
			this.componentWillReceiveProps = this.prepareSlideTransition.bind(this);
			this.setSlideIndex = setSlideIndexHandler;
		}
		else {
			this.setSlideIndex = this.setSlideIndex.bind(this);
		}
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

	componentWillUnmount () {

		const { dragEnabled } = this.props;

		if (dragEnabled) {
			removeDragListeners(this.wrapper);
		}

		this.wrapper.removeEventListener('transitionend', this.transitionEndHandler);
	}

	prepareSlideTransition ({ currentSlideIndex: newSlideIndex }) {

		const { children } = this.props,
			childCount = React.Children.count(children),
			currentSlideIndex = this.getCurrentSlideIndex();

		if ((newSlideIndex !== currentSlideIndex) &&
			newSlideIndex >= 0 && newSlideIndex < childCount
		) {

			this.setState({
				isInTransition: true,
				transitionDirection: newSlideIndex < currentSlideIndex ? DIRECTION_START : DIRECTION_END
			});
		}
	}

	shiftSlideIndex (indexShift) {

		return (evt) => {

			evt.stopPropagation();

			this.setSlideIndex(this.getCurrentSlideIndex() + indexShift);
		};
	}

	endDragHandler (evt) {

		const { children,
			dragThreshold,
			peek,
			transitionDuration,
			transitionEase
		} = this.props,
			currentSlideIndex = this.getCurrentSlideIndex(),
			{ shiftX } = evt,
			slideCount = React.Children.count(children);

		this.container.style.transition = this.getSlideContainerTransition(transitionDuration, transitionEase);

		this.setState({
			isDragged: false
		}, () => { // eslint-disable-line consistent-return

			if (shiftX < (dragThreshold * -1) || shiftX > dragThreshold) {

				const newSlideIndex = currentSlideIndex + (shiftX > 0 ? 1 : -1);

				if (newSlideIndex >= 0 && newSlideIndex < slideCount) {
					return this.setSlideIndex(newSlideIndex);
				}
			}

			this.container.style.transform = this.getSlideContainerTransform(slideCount, currentSlideIndex, peek);
		});
	}

	dragHandler (evt) {

		const { children, peek, dragFactor } = this.props,
			currentSlideIndex = this.getCurrentSlideIndex(),
			slideCount = React.Children.count(children);

		this.container.style.transform = this.getSlideContainerTransform(
			slideCount,
			currentSlideIndex,
			peek,
			evt.dragX * dragFactor
		);
	}

	startDragHandler () {

		this.container.style.transition = 'none';

		this.setState({
			isDragged: true
		});
	}

	transitionEndHandler () {

		this.setState({
			isInTransition: false
		});
	}

	getCarouselChild (bemClass) {

		return (childElement, i) => {

			const { transitionDuration } = this.props,
				currentSlideIndex = this.getCurrentSlideIndex(),
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
				classes: classes.concat(bemClass.element('item')).concat(isActive ? ['is-active'] : []),
				index: i,
				transitionDuration
			});
		};
	}

	getCarouselControls (id, bemClass) {

		const { children } = this.props,
			controlBemClass = bem(bemClass.element('control-button')),
			currentSlideIndex = this.getCurrentSlideIndex(),
			slideCount = React.Children.count(children);

		return [(
			<ToggleButton
				aria={ { controls: id } }
				classes={ controlBemClass.modifiers('prev') }
				clickHandler={ this.shiftSlideIndex(-1) } // eslint-disable-line no-magic-numbers
				disabled={ !slideCount || currentSlideIndex === 0 }
				key={ 'prev-button' }
				label="Previous Slide"
			/>
		), (
			<ToggleButton
				aria={ { controls: id } }
				classes={ controlBemClass.modifiers('next') }
				clickHandler={ this.shiftSlideIndex(1) } // eslint-disable-line no-magic-numbers
				disabled={ !slideCount || currentSlideIndex === (slideCount - 1) }
				key={ 'next-button' }
				label="Next Slide"
			/>
		)];
	}

	getCurrentSlideIndex () {

		return get(this.state, 'currentSlideIndex', get(this.props, 'currentSlideIndex'));
	}

	getSlideContainerTransform (slideCount, currentSlideIndex, peek, offset = 0) {

		if (!slideCount) {
			return 'translateX(0%)';
		}

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

	setSlideIndex (newSlideIndex) {

		const { children } = this.props,
			childCount = React.Children.count(children),
			currentSlideIndex = this.getCurrentSlideIndex();

		if ((newSlideIndex !== currentSlideIndex) &&
			newSlideIndex >= 0 && newSlideIndex < childCount
		) {

			this.setState({
				currentSlideIndex: newSlideIndex,
				isInTransition: true,
				transitionDirection: newSlideIndex < currentSlideIndex ? DIRECTION_START : DIRECTION_END
			});
		}
	}

	render () {

		const { aria,
			bemClass,
			children,
			className,
			id,
			peek,
			showControls,
			transitionDuration,
			transitionEase
		} = this.props,
			currentSlideIndex = this.getCurrentSlideIndex(),
			{ isDragged, isInTransition, transitionDirection } = this.state,
			ariaAttrs = getAriaAttrs(aria),
			slideCount = React.Children.count(children),
			dragClass = isDragged ? 'is-dragged' : '',
			transitionClass = isInTransition ? `is-in-transition transition-direction-${ transitionDirection }` : '';

		return (
			<div
				className={ combineClasses(className, dragClass, transitionClass).join(' ') }
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
						{ React.Children.map(children, this.getCarouselChild(bemClass)) }
					</div>
				</div>
				{ showControls && this.getCarouselControls(id, bemClass) }
			</div>
		);
	}
}

Carousel.defaultProps = {
	className: 'c-carousel',
	currentSlideIndex: 0,
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
	setSlideIndexHandler: React.PropTypes.func,
	showControls: React.PropTypes.bool.isRequired,
	transitionDuration: React.PropTypes.number.isRequired,
	transitionEase: React.PropTypes.string.isRequired
};

export default BemClasses(Carousel);