import React from 'react';
import { get } from 'lodash';
import combineClasses from 'modules/combineClasses';
import { addDragListeners, removeDragListeners } from 'modules/dragTracker';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const DIRECTION_START = 'start',
	DIRECTION_END = 'end',
	DRAGGED_CLASS = 'is-dragged',
	TRANSITION_CLASS = 'is-in-transition';

class Carousel extends React.PureComponent {

	constructor (props) {

		super(props);

		const { currentSlideIndex, setSlideIndexHandler } = props;

		// NOTE: If 'setSlideIndexHandler' is not supplied then currentSlideIndex is controlled via state.
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
		this.shiftSlideIndex = this.shiftSlideIndex.bind(this);

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
				isActive = i === currentSlideIndex,
				aria = { hidden: !isActive },
				ariaAttrs = getAriaAttrs(aria);

			return (
				<div
					className={ combineClasses(bemClass.element('item'), isActive && 'is-active').join(' ') }
					{ ...ariaAttrs }
				>
					{
						React.cloneElement(childElement, {
							index: i,
							transitionDuration
						})
					}
				</div>
			);
		};
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
			controls: Controls,
			id,
			peek,
			transitionDuration,
			transitionEase
		} = this.props,
			currentSlideIndex = this.getCurrentSlideIndex(),
			{ isDragged, isInTransition, transitionDirection } = this.state,
			ariaAttrs = getAriaAttrs(aria),
			slideCount = React.Children.count(children);

		return (
			<div
				className={ combineClasses(className,
					isDragged && DRAGGED_CLASS,
					isInTransition && `${ TRANSITION_CLASS } transition-direction-${ transitionDirection }`).join(' ')
				}
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
				{ Controls && (
					<Controls
						controlsId={ id }
						count={ slideCount }
						index={ currentSlideIndex }
						skipSlideHandler={ this.shiftSlideIndex }
					/>
				) }
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
	transitionDuration: 0.5,
	transitionEase: 'ease-out'
};

Carousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	controls: React.PropTypes.func,
	currentSlideIndex: React.PropTypes.number.isRequired,
	dragEnabled: React.PropTypes.bool.isRequired,
	dragFactor: React.PropTypes.number.isRequired,
	dragThreshold: React.PropTypes.number.isRequired,
	id: React.PropTypes.string.isRequired,
	peek: propTypes.range(0, 49), // eslint-disable-line no-magic-numbers
	setSlideIndexHandler: React.PropTypes.func,
	transitionDuration: React.PropTypes.number.isRequired,
	transitionEase: React.PropTypes.string.isRequired
};

export default BemClasses(Carousel);