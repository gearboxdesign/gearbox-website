import React from 'react';
import { get, kebabCase } from 'lodash';
import bem from 'modules/bem';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Carousel from 'components/lib/Carousel';
import ErrorComponent from 'components/ui/Error';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import ProjectSlide from 'components/ui/ProjectSlide';
import ProjectSummary from 'components/ui/ProjectSummary';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Projects (props) {

	const { aria,
		bemClass,
		className,
		currentProjectIndex,
		projects,
		setProjectIndexHandler
	} = props,
		ariaAttrs = getAriaAttrs(aria),
		data = get(projects, 'data'),
		errors = get(process, 'errors');

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<div className={ bemClass.element('container') }>
				{ errors ?
					<ErrorComponent errors={ errors } /> :
					<GridRow align={ GridRow.ALIGN_STRETCH }>
						<GridCol
							breakpoints={ [{
								breakpoint: 'medium',
								count: 8
							}] }
							count={ 12 }
						>
							<Carousel
								classes={ bemClass.element('content') }
								currentSlideIndex={ currentProjectIndex }
								id={ 'project-poster-carousel' }
								setSlideIndexHandler={ setProjectIndexHandler }
							>
								{ data && data.map(getProjectSlide) }
							</Carousel>
						</GridCol>
						<GridCol
							breakpoints={ [{
								breakpoint: 'medium',
								count: 4
							}] }
							count={ 12 }
						>
							<Carousel
								classes={ bem(bemClass.element('content')).modifiers('detail') }
								currentSlideIndex={ currentProjectIndex }
								id={ 'project-summary-carousel' }
								setSlideIndexHandler={ setProjectIndexHandler }
								showControls={ false }
							>
								{ data && data.map(getProjectSummary) }
							</Carousel>
						</GridCol>
					</GridRow>
				}
			</div>
		</div>
	);
}

function getProjectSlide ([slug, project]) {

	return (
		<ProjectSlide
			key={ kebabCase(slug) }
			project={ project }
		/>
	);
}

function getProjectSummary ([slug, project]) {

	return (
		<ProjectSummary
			key={ kebabCase(slug) }
			project={ project }
		/>
	);
}

Projects.defaultProps = {
	className: 'c-projects'
};

Projects.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	currentProjectIndex: React.PropTypes.number.isRequired,
	projects: propTypes.asyncState,
	setProjectIndexHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Projects);