import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import Specialties from 'components/Specialties';

export default class SpecialtiesContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			specialtyIndex: 0
		};

		this.setSlideIndex = this.setSlideIndex.bind(this);
	}

	setSlideIndex (specialtyIndex) {

		const { specialtiesItems } = this.props;

		if (specialtyIndex >= 0 && specialtyIndex < specialtiesItems.length) {

			this.setState({
				specialtyIndex
			});
		}
	}

	render () {

		const { specialtyIndex } = this.state,
			{ meta: { id }, ...restProps } = this.props;

		return (
			<Specialties
				id={ id }
				setSpecialtyIndexHandler={ this.setSlideIndex }
				specialtyIndex={ specialtyIndex }
				{ ...restProps }
			/>
		);
	}
}

SpecialtiesContainer.defaultProps = {};

SpecialtiesContainer.propTypes = {
	meta: propTypes.meta,
	specialtiesItems: React.PropTypes.arrayOf(React.PropTypes.shape({
		heading: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		icon: propTypes.image.isRequired
	})).isRequired
};