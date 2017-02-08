import React from 'react'; // eslint-disable-line no-unused-vars
import Specialties from 'components/Specialties';

export default class SpecialtiesContainer extends React.Component {

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

		const { specialtyIndex } = this.state;

		return (
			<Specialties
				setSpecialtyIndexHandler={ this.setSlideIndex }
				specialtyIndex={ specialtyIndex }
				{ ...this.props }
			/>
		);
	}
}

SpecialtiesContainer.defaultProps = {};

SpecialtiesContainer.propTypes = {
	specialtiesItems: React.PropTypes.arrayOf(React.PropTypes.shape({
		heading: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		icon: React.PropTypes.object.isRequired // TODO: Replace with custom 'image' PropType.
	})).isRequired
};