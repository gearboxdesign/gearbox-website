import React from 'react'; // eslint-disable-line no-unused-vars
import CarouselContainer from 'containers/CarouselContainer';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';
import SpecialtiesSymbol from 'components/SpecialtiesSymbol';
import SpecialtiesDetail from 'components/SpecialtiesDetail';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Specialties (props) {

	/* eslint-disable no-unused-vars */
	const { aria, bemClass, className, heading, specialtyIndex, setSpecialtyIndexHandler, specialtiesItems } = props,
		ariaAttrs = getAriaAttrs(aria);

	/* eslint-enable */

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
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
						{ specialtiesItems.map(getSpecialtiesSymbolItem) }
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
						showControls={ false }
					>
						{ specialtiesItems.map(getSpecialtiesDetailItem(heading)) }
					</CarouselContainer>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getSpecialtiesDetailItem (heading) {

	return (props) => {

		const { meta: { id }, heading: subHeading, ...restProps } = props; // eslint-disable-line react/prop-types

		return (
			<SpecialtiesDetail
				heading={ heading }
				key={ id }
				subHeading={ subHeading }
				{ ...restProps }
			/>
		);
	};
}

function getSpecialtiesSymbolItem (props) {

	const { meta: { id }, heading, icon } = props; // eslint-disable-line react/prop-types

	return (
		<SpecialtiesSymbol
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
	aria: propTypes.aria,
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