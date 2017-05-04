import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
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
			currentProject,
			projects,
			setCurrentProjectSlugHandler
		} = props,
		ariaAttrs = getAriaAttrs(aria),
		data = get(projects, 'data'),
		errors = get(process, 'errors');

	console.log(currentProject);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			{ errors ?
				<ErrorComponent errors={ errors } /> :
				data && Object.entries(data).map(getProject(setCurrentProjectSlugHandler))
			}
		</div>
	);
}

function getProject (setCurrentProjectSlugHandler) {

	return ([id, project]) => {

		const slug = get(project, 'data.slug');

		return (
			<div>
				<button onClick={ (evt) => {
					setCurrentProjectSlugHandler(slug);
					window.history.pushState({}, 'test', `/work/${ slug }`);
				} }>
					{ slug }
				</button>
				<ProjectTile
					project={ project }
				/>
			</div>
		);
	}
}

ProjectCarousel.defaultProps = {
	className: 'c-project-carousel'
};

ProjectCarousel.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	currentProject: propTypes.asyncState,
	projects: propTypes.asyncState,
	setCurrentProjectSlugHandler: React.PropTypes.func.isRequired
};

export default BemClasses(ProjectCarousel);