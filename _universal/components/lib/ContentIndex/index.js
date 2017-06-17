import React from 'react';
import { findIndex, matchesProperty, maxBy } from 'lodash';
import { get as fGet } from 'lodash/fp';
import jump from 'jump.js';
import { addScrollListener, removeScrollListener, getScrollPos } from 'modules/scrollTracker';
import { addResizeListener, removeResizeListener, getViewportDimensions } from 'modules/resizeTracker';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// NOTE: Extends React.Component as change in children must correctly trigger a render.
class ContentIndex extends React.Component {

	constructor (props) {

		super(props);

		this.state = {
			contentIndex: 0
		};

		this.contentDirectory = [];

		this.wrapChildElement = this.wrapChildElement.bind(this);
		this.skipContentHandler = this.skipContentHandler.bind(this);
		this.setContentIndex = this.setContentIndex.bind(this);
		this.setContentDirectory = this.setContentDirectory.bind(this);
		this.setScrollPosition = this.setScrollPosition.bind(this);
	}

	componentDidMount () {

		this.setContentDirectory();

		const { hash } = window.location;

		if (hash) {

			const initialContentIndex = findIndex(
				this.contentDirectory,
				matchesProperty('id', hash.replace('#', ''))
			);

			window.addEventListener('load', this.setScrollPosition.bind(this, initialContentIndex, false), {
				once: true
			});
		}

		addResizeListener(this.setContentIndex);
		addScrollListener(this.setContentIndex);
	}

	componentDidUpdate () {

		this.setContentDirectory();
	}

	componentWillUnmount () {

		removeResizeListener(this.setContentIndex);
		removeScrollListener(this.setContentIndex);
	}

	wrapChildElement (child) {

		const { id } = child.props;

		return (
			<div
				data-content
				id={ id }
			>
				{ child }
			</div>
		);
	}

	skipContentHandler (contentIndexShift) {

		const { contentIndex } = this.state;

		this.setScrollPosition((contentIndex + contentIndexShift) - 1, true);
	}

	getContentPosition (content) {

		const { top: contentBoundsTop, bottom: contentBoundsBottom } = content.getBoundingClientRect(),
			{ id } = content,
			{ y: scrollTop } = getScrollPos();

		return {
			bottom: Math.floor(scrollTop + contentBoundsBottom),
			element: content,
			id,
			top: Math.floor(scrollTop + contentBoundsTop)
		};
	}

	getContentVisibility (scrollTop, scrollBottom) {

		return (contentPosition) => {

			const { bottom, id, top } = contentPosition,
				result = { id };

			if (scrollBottom >= top && scrollTop <= bottom) {

				return Object.assign({}, result, {
					visibility: (scrollBottom - top) -
						(scrollBottom > bottom ? scrollBottom - bottom : 0) -
						(scrollTop > top ? scrollTop - top : 0)
				});
			}

			return Object.assign({}, result, {
				visibility: 0
			});
		};
	}

	setContentDirectory () {

		if (process.env.CLIENT) {

			this.contentDirectory = Array.from(this.container.querySelectorAll('[data-content]'))
				.map(this.getContentPosition);
		}
	}

	setContentIndex () {

		const { viewportOffsetBottom, viewportOffsetTop } = this.props,
			{ y: scrollTop } = getScrollPos(),
			{ top: containerBoundsTop, bottom: containerBoundsBottom } = this.container.getBoundingClientRect(),
			{ innerHeight: viewportHeight } = getViewportDimensions(),
			{ pathname: currentLocation } = window.location,
			containerTop = scrollTop + containerBoundsTop,
			containerBottom = scrollTop + containerBoundsBottom,
			scrollBottom = scrollTop + viewportHeight;

		if (
			scrollTop >= Math.floor(containerTop - (viewportOffsetTop * viewportHeight)) &&
			scrollBottom <= Math.floor(containerBottom + (viewportOffsetBottom * viewportHeight))
		) {

			const contentVisibility = this.contentDirectory.map(this.getContentVisibility(scrollTop, scrollBottom)),
				mostVisibleContent = maxBy(contentVisibility, fGet('visibility'));

			if (mostVisibleContent && mostVisibleContent.visibility > 0) {

				const { id } = mostVisibleContent;

				window.history.replaceState(null, id, `${ currentLocation }#${ id }`);

				return this.setState({
					contentIndex: findIndex(contentVisibility, mostVisibleContent) + 1
				});
			}
		}

		window.history.replaceState(null, '', currentLocation);

		return this.setState({ contentIndex: 0 });
	}

	setScrollPosition (contentIndex, smoothScroll = false) {

		const maxIndex = this.contentDirectory.length - 1;

		if (contentIndex > maxIndex) {
			throw new RangeError(`"contentIndex" argument must be within range 0 - ${ maxIndex }`);
		}

		const { transitionDuration, viewportOffsetTop } = this.props,
			{ innerHeight: viewportHeight } = getViewportDimensions(),
			content = this.contentDirectory[contentIndex];

		jump(content.element, {
			duration: smoothScroll ? transitionDuration : 0,
			offset: (viewportOffsetTop * viewportHeight) * -1
		});
	}

	render () {

		const { aria,
			children,
			className,
			controls: Controls,
			controlsNextLabel,
			controlsPreviousLabel,
			id
		} = this.props,
			{ contentIndex } = this.state,
			ariaAttrs = getAriaAttrs(aria);

		const wrappedChildren = React.Children.map(children, this.wrapChildElement);

		return (
			<div
				className={ className }
				id={ id }
				ref={ (element) => { this.container = element; } }
				{ ...ariaAttrs }
			>
				{ Controls && (
					<Controls
						controlsId={ id }
						nextLabel={ controlsNextLabel }
						previousLabel={ controlsPreviousLabel }
						count={ wrappedChildren.length }
						index={ contentIndex }
						skipContentHandler={ this.skipContentHandler }
					/>
				) }
				{ wrappedChildren }
			</div>
		);
	}
}

ContentIndex.defaultProps = {
	className: 'c-content-index',
	transitionDuration: 500,
	viewportOffsetBottom: 0,
	viewportOffsetTop: 0
};

ContentIndex.propTypes = {
	aria: propTypes.aria,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	controls: React.PropTypes.func,
	controlsNextLabel: propTypes.requiredWith('controls'),
	controlsPreviousLabel: propTypes.requiredWith('controls'),
	id: React.PropTypes.string.isRequired,
	transitionDuration: React.PropTypes.number.isRequired,
	viewportOffsetBottom: propTypes.range(0, 1),
	viewportOffsetTop: propTypes.range(0, 1)
};

export default BemClasses(ContentIndex);