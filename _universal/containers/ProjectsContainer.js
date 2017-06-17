import React from 'react';
import { findIndex, flow, get } from 'lodash';
import { connect } from 'react-redux';
import getAsyncState from 'modules/getAsyncState';
import propTypes from 'components/lib/propTypes';
import Projects from 'components/ui/Projects';

function ProjectsContainer (props) {

	const { currentProjectSlug, getProjectHandler, projects, ...restProps } = props,
		data = get(projects, 'data'),
		projectsArr = (data && Object.entries(data).sort(sortProjects)) || [],
		currentProjectIndex = findIndex(projectsArr, matchSlug(currentProjectSlug)),
		setProjectIndexHandler = flow(
			(index) => { return get(projectsArr, `[${ index }][0]`); },
			getProjectHandler
		);

	return (
		<Projects
			currentProjectIndex={ currentProjectIndex >= 0 ? currentProjectIndex : 0 }
			projects={ getAsyncState(Object.assign({}, projects, data && { data: projectsArr })) }
			setProjectIndexHandler={ setProjectIndexHandler }
			{ ...restProps }
		/>
	);
}

function matchSlug (currentProjectSlug) {

	return ([slug]) => {

		return slug === currentProjectSlug;
	};
}

function sortProjects ([slugA, projectA], [slugB, projectB]) {

	const dateA = get(projectA, 'data.date'),
		dateB = get(projectB, 'data.date');

	return (dateA && dateB) ? new Date(dateB) - new Date(dateA) : -1;
}

function mapStateToProps (state) {

	const { currentProjectSlug, projects } = state;

	return {
		currentProjectSlug,
		projects
	};
}

ProjectsContainer.defaultProps = {};

ProjectsContainer.propTypes = {
	currentProjectSlug: React.PropTypes.string,
	getProjectHandler: React.PropTypes.func.isRequired,
	projects: propTypes.asyncState
};

export default connect(mapStateToProps)(ProjectsContainer);
