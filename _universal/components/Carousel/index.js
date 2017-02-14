import React from 'react'; // eslint-disable-line no-unused-vars
import { trim } from 'lodash';
import bem from 'modules/bem';
import { addDragListeners, removeDragListeners } from 'modules/dragTracker';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ToggleButton from 'components/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

const DIRECTION_START = 'start',
	DIRECTION_END = 'end';

/* eslint-enable */
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
	}

	componentDidMount () {

		const { dragEnabled } = this.props;

		if (dragEnabled) {

			addDragListeners(this.elem, {
				start: this.startDragHandler,
				drag: this.dragHandler,
				end: this.endDragHandler
			});
		}
	}

	componentWillReceiveProps (nextProps) {

		const { currentSlideIndex: nextSlideIndex } = nextProps,
			{ currentSlideIndex, transitionDuration } = this.props;

		if (nextSlideIndex !== currentSlideIndex) {

			this.setState({
				isInTransition: true,
				transitionDirection: nextSlideIndex < currentSlideIndex ? DIRECTION_START : DIRECTION_END
			});

			setTimeout(() => {

				this.setState({
					isInTransition: false
				});

			}, transitionDuration * 1000); // eslint-disable-line no-magic-numbers
		}
	}

	componentWillUnmount () {

		const { dragEnabled } = this.props;

		if (dragEnabled) {

			removeDragListeners(this.elem);
		}
	}

	startDragHandler (evt) {

		this.setState({
			isDragged: true
		});

		console.log(evt);
	}

	dragHandler (evt) {

		console.log(evt);
	}

	endDragHandler (evt) {

		this.setState({
			isDragged: false
		});

		console.log(evt);
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

	getCarouselControls (className) {

		const { children, currentSlideIndex } = this.props,
			slideCount = React.Children.count(children),
			bemClass = bem(className);

		return [(
			<ToggleButton
				classes={ bemClass.modifiers('prev') }
				clickHandler={ this.setSlideIndex(-1) } // eslint-disable-line no-magic-numbers
				disabled={ currentSlideIndex === 0 }
				key={ 'prev-button' }
				label="Previous Slide"
			/>
		), (
			<ToggleButton
				classes={ bemClass.modifiers('next') }
				clickHandler={ this.setSlideIndex(1) } // eslint-disable-line no-magic-numbers
				disabled={ currentSlideIndex === (slideCount - 1) }
				key={ 'next-button' }
				label="Next Slide"
			/>
		)];
	}

	setSlideIndex (indexShift) {

		const { setSlideIndexHandler, currentSlideIndex } = this.props;

		return (evt) => {

			debugger;

			evt.stopPropagation();

			setSlideIndexHandler(currentSlideIndex + indexShift);
		};
	}

	render () {

		// TODO: Add ARIA, such as controls.
		const { aria,
				bemClass,
				children,
				className,
				currentSlideIndex,
				peek,
				showControls,
				transitionDuration,
				transitionEase
			} = this.props,
			{ isDragged, isInTransition, transitionDirection } = this.state,
			ariaAttrs = getAriaAttrs(aria),
			slideCount = React.Children.count(children),
			slideWidth = 100 / slideCount, // eslint-disable-line no-magic-numbers
			slideContainerWidth = slideCount * (100 - (peek * 2)), // eslint-disable-line no-magic-numbers
			slidePeekOffset = (peek / slideContainerWidth) * 100, // eslint-disable-line no-magic-numbers
			slidePos = ((slideWidth * currentSlideIndex) * -1) + slidePeekOffset, // eslint-disable-line no-magic-numbers
			dragClass = isDragged ? 'is-dragged' : '',
			transitionClass = isInTransition ? `is-in-transition transition-direction-${ transitionDirection }` : '';

		return (
			<div
				className={ trim(`${ className } ${ dragClass } ${ transitionClass }`) }
				ref={ (elem) => { this.elem = elem; } }
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
				{ showControls && this.getCarouselControls(bemClass.element('control-button')) }
			</div>
		);
	}
}

Carousel.defaultProps = {
	className: 'c-carousel',
	dragEnabled: true,
	peek: 0,
	showControls: true,
	transitionDuration: 0.5,
	transitionEase: 'ease-in-out'
};

Carousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	currentSlideIndex: React.PropTypes.number.isRequired,
	dragEnabled: React.PropTypes.bool.isRequired,
	peek: propTypes.minMax(0, 49), // eslint-disable-line no-magic-numbers
	setSlideIndexHandler: React.PropTypes.func.isRequired,
	showControls: React.PropTypes.bool.isRequired,
	transitionDuration: React.PropTypes.number.isRequired,
	transitionEase: React.PropTypes.string.isRequired
};

export default BemClasses(Carousel);