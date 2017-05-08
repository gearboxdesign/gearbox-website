import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Carousel from 'components/lib/Carousel';
import ErrorComponent from 'components/ui/Error';
import ProjectTile from 'components/ui/ProjectTile';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectCarousel (props) {

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
			{ errors ?
				<ErrorComponent errors={ errors } /> :
				<Carousel
					currentSlideIndex={ currentProjectIndex }
					id={ 'project-carousel' }
					setSlideIndexHandler={ setProjectIndexHandler }
				>
					{ data && data.map(getProjectTile) }
				</Carousel>
			}
		</div>
	);
}

function getProjectTile ([slug, project]) {

	// TODO: Get a key from project data somehow.
	return (
		<ProjectTile
			key={ slug }
			project={ project }
		/>
	);
}

ProjectCarousel.defaultProps = {
	className: 'c-project-carousel'
};

ProjectCarousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	currentProjectIndex: React.PropTypes.number.isRequired,
	projects: propTypes.asyncState,
	setProjectIndexHandler: React.PropTypes.func.isRequired
};

export default BemClasses(ProjectCarousel);