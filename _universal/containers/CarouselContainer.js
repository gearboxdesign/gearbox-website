import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import Carousel from 'components/Carousel';

export default class CarouselContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		const { setSlideIndexHandler, currentSlideIndex } = props;

		if (setSlideIndexHandler) {

			this.setSlideIndex = setSlideIndexHandler;
		}
		else {

			this.state = {
				currentSlideIndex
			};

			this.setSlideIndex = this.setSlideIndex.bind(this);
		}
	}

	setSlideIndex (currentSlideIndex) {

		if (this.state) {

			const { children } = this.props,
				childCount = React.Children.count(children);

			if (currentSlideIndex >= 0 && currentSlideIndex < childCount) {

				this.setState({
					currentSlideIndex
				});
			}
		}
	}

	render () {

		const currentSlideIndex = get(this.state, 'currentSlideIndex', get(this.props, 'currentSlideIndex'));

		return (
			<Carousel
				currentSlideIndex={ currentSlideIndex }
				setSlideIndexHandler={ this.setSlideIndex }
				{ ...this.props }
			/>
		);
	}
}

CarouselContainer.defaultProps = {
	currentSlideIndex: 0
};

CarouselContainer.propTypes = {
	children: React.PropTypes.node,
	currentSlideIndex: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
	setSlideIndexHandler: React.PropTypes.func
};