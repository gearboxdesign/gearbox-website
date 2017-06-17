import React from 'react';
import { get, noop } from 'lodash';
import { connect } from 'react-redux';
import { getProject, getProjects } from 'actions/actionCreators';
import projectsReducer from 'reducers/projectsReducer';
import currentProjectSlugReducer from 'reducers/currentProjectSlugReducer';
import Template from 'templates/Template';
import ProjectsContainer from 'containers/ProjectsContainer';
import ProjectDetailContainer from 'containers/ProjectDetailContainer';

class WorkTemplate extends React.PureComponent {

	// TODO: Remove this if alternative landing page is created.
	componentDidMount () {

		const { currentProjectSlug,
			getProjectHandler,
			routeData: { params: { slug } }
		} = this.props;

		getProjectHandler(slug || currentProjectSlug);
	}

	render () {

		// TODO: Consider alternative landing page, render contents based on presence of 'slug' prop here.
		const { children, getProjectHandler, routeData: { params: { slug } } } = this.props,
			index = React.Children.count(children);

		return (
			<main>
				{ children }
				<ProjectsContainer
					getProjectHandler={ getProjectHandler }
					index={ index }
				/>
				<ProjectDetailContainer
					index={ index }
				/>
			</main>
		);
	}
}

WorkTemplate.defaultProps = {};

WorkTemplate.propTypes = {
	children: React.PropTypes.node,
	currentProjectSlug: React.PropTypes.string,
	getProjectHandler: React.PropTypes.func.isRequired,
	routeData: React.PropTypes.object.isRequired
};

function getLatestProject (store) {

	return () => {

		const data = get(store.getState(), 'projects.data', {}),
			latestProject = Object.entries(data).reduce((project, [currentSlug, currentProject]) => {

				const projectDate = get(project, 'data.date', null),
					currentProjectDate = get(currentProject, 'data.date', null);

				return new Date(currentProjectDate) > new Date(projectDate) ? currentProject : project;

			}, null);


		return store.dispatch(getProject(get(latestProject, 'data.slug')));
	};
}

function mapStateToProps (state) {

	const { currentProjectSlug } = state;

	return {
		currentProjectSlug
	};
}

function mapDispatchToProps (dispatch, ownProps) {

	const { routeData, router } = ownProps,
		{ lang, url } = routeData,
		{ getCurrentLocation } = router,
		routeUrl = lang ? `/${ lang }${ url }` : url;

	return {
		getProjectHandler: (slug) => {

			const { hash } = getCurrentLocation();

			window.history.replaceState(null, slug, `${ routeUrl }/${ slug }${ hash }`);

			dispatch(getProject(slug));
		}
	};
}

const WrappedWorkTemplate = connect(mapStateToProps, mapDispatchToProps)(Template(WorkTemplate));

WrappedWorkTemplate.onInit = (store, routeData) => {

	const { params: { slug } } = routeData;

	store.registerReducers({
		currentProjectSlug: currentProjectSlugReducer,
		projects: projectsReducer
	});

	return Promise.all([
		store.dispatch(getProjects()).then(slug ? noop : getLatestProject(store))
	].concat(slug ? store.dispatch(getProject(slug)) : []));
};

export default WrappedWorkTemplate;