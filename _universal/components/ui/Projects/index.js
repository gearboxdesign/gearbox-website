import React from 'react';
import { get, kebabCase } from 'lodash';
import bem from 'modules/bem';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import Carousel from 'components/lib/Carousel';
import CarouselControls from 'components/lib/CarouselControls';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import ErrorComponent from 'components/ui/Error';
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
		index,
		projects,
		setProjectIndexHandler
	} = props,
		ariaAttrs = getAriaAttrs(aria),
		data = get(projects, 'data'),
		errors = get(process, 'errors');

	// TODO: Pass next / prev label to Carousels, (pass translations from container).
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
							<Animate
								index={ index }
								modifiers={ 'full-height' }
								type={ Animate.SLIDE_LEFT }
							>
								<Carousel
									classes={ bemClass.element('content') }
									controls={ CarouselControls }
									controlsNextLabel={ '[Next]' }
									controlsPreviousLabel={ '[Previous]' }
									currentSlideIndex={ currentProjectIndex }
									id={ 'project-poster-carousel' }
									setSlideIndexHandler={ setProjectIndexHandler }
								>
									{ data && data.map(getProjectSlide) }
								</Carousel>
							</Animate>
						</GridCol>
						<GridCol
							breakpoints={ [{
								breakpoint: 'medium',
								count: 4
							}] }
							count={ 12 }
						>
							<Animate
								index={ index }
								modifiers={ 'full-height' }
								type={ Animate.SLIDE_RIGHT }
							>
								<Carousel
									classes={ bem(bemClass.element('content')).modifiers('detail') }
									currentSlideIndex={ currentProjectIndex }
									id={ 'project-summary-carousel' }
									setSlideIndexHandler={ setProjectIndexHandler }
								>
									{ data && data.map(getProjectSummary) }
								</Carousel>
							</Animate>
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
	className: 'c-projects',
	index: 0
};

Projects.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	currentProjectIndex: React.PropTypes.number.isRequired,
	index: React.PropTypes.number.isRequired,
	projects: propTypes.asyncState,
	setProjectIndexHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Projects);