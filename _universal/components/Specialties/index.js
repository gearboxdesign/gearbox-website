import React from 'react'; // eslint-disable-line no-unused-vars
import CarouselContainer from 'containers/CarouselContainer';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';
import SpecialtiesIcon from 'components/SpecialtiesIcon';
import SpecialtiesSlide from 'components/SpecialtiesSlide';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Specialties (props) {

	/* eslint-disable no-unused-vars */
	const { bemClass, className, heading, specialtyIndex, setSpecialtyIndexHandler, specialtiesItems } = props;

	/* eslint-enable */

	return (
		<div className={ className }>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<CarouselContainer
						classes={ bemClass.element('icons-carousel') }
						currentSlideIndex={ specialtyIndex }
						peek={ 10 }
						setSlideIndexHandler={ setSpecialtyIndexHandler }
					>
						{ specialtiesItems.map(getSpecialtiesIconItem) }
					</CarouselContainer>

				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<CarouselContainer
						classes={ bemClass.element('detail-carousel') }
						currentSlideIndex={ specialtyIndex }
						setSlideIndexHandler={ setSpecialtyIndexHandler }
					>
						{ specialtiesItems.map(getSpecialtiesSlideItem(heading)) }
					</CarouselContainer>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getSpecialtiesSlideItem (heading) {

	return (props) => {

		const { meta: { id }, heading: subHeading, ...restProps } = props; // eslint-disable-line react/prop-types

		return (
			<SpecialtiesSlide
				heading={ heading }
				key={ id }
				subHeading={ subHeading }
				{ ...restProps }
			/>
		);
	};
}

function getSpecialtiesIconItem (props, i) {

	const { meta: { id }, heading, icon } = props; // eslint-disable-line react/prop-types

	return (
		<SpecialtiesIcon
			icon={ icon }
			key={ id }
			title={ heading }
		/>
	);
}

Specialties.defaultProps = {
	className: 'c-specialties'
};

Specialties.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	setSpecialtyIndexHandler: React.PropTypes.func.isRequired,
	specialtiesItems: React.PropTypes.arrayOf(React.PropTypes.shape({
		heading: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
		icon: React.PropTypes.object.isRequired // TODO: Replace with custom 'image' PropType.
	})).isRequired,
	specialtyIndex: React.PropTypes.number.isRequired
};

export default BemClasses(Specialties);