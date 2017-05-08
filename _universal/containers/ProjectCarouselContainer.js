import React from 'react'; // eslint-disable-line no-unused-vars
import { findIndex, flow, get } from 'lodash';
import { connect } from 'react-redux';
import getAsyncState from 'modules/getAsyncState';
import { getProject } from 'actions/actionCreators';
import propTypes from 'components/lib/propTypes';
import ProjectCarousel from 'components/ui/ProjectCarousel';

// TODO: Handle when array is empty.
function ProjectCarouselContainer (props) {

	const { currentProjectSlug, getProjectHandler, projects } = props,
		data = get(projects, 'data'),
		sortedProjectArr = (data && Object.entries(data).sort(sortProjects)) || [],
		currentProjectIndex = findIndex(sortedProjectArr, matchSlug(currentProjectSlug)),
		setProjectIndexHandler = flow((index) => {
			return get(sortedProjectArr, `[${ index }][0]`);
		}, getProjectHandler);

	return (
		<ProjectCarousel
			currentProjectIndex={ currentProjectIndex >= 0 ? currentProjectIndex : 0 }
			projects={ getAsyncState(Object.assign({}, projects, data && { data: sortedProjectArr })) }
			setProjectIndexHandler={ setProjectIndexHandler }
		/>
	);
}

function matchSlug (currentProjectSlug) {

	return ([slug]) => {

		return slug === currentProjectSlug;
	};
}

function sortProjects ([slugA, projectA], [slugB, projectB]) {

	// NOTE: Sort slugs alphabetically.
	return (slugA < slugB) ? -1 : (slugA > slugB) ? 1 : 0;

	// TODO: Sorting by this data can be an issue if projects do not load as this will affect the order. 
	// const dateA = get(projectA, 'data.date'),
	// 	dateB = get(projectB, 'data.date');

	// return (dateA && dateB) ? new Date(dateA) - new Date(dateB) : 1;
}

function mapStateToProps (state) {

	const { currentProjectSlug, projects } = state;

	return {
		currentProjectSlug,
		projects
	};
}

function mapDispatchToProps (dispatch, ownProps) {

	const { routeUrl } = ownProps;

	return {
		getProjectHandler: (slug) => {

			if (slug) {
				window.history.pushState({}, slug, `${ routeUrl }/${ slug }`);
				dispatch(getProject(slug));
			}
		}
	};
}

ProjectCarouselContainer.defaultProps = {};

ProjectCarouselContainer.propTypes = {
	currentProjectSlug: React.PropTypes.string,
	getProjectHandler: React.PropTypes.func.isRequired,
	projects: propTypes.asyncState
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCarouselContainer);
