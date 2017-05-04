import React from 'react';
import { getProject, getProjects, setCurrentProjectSlug } from 'actions/actionCreators';
import projectsReducer from 'reducers/projectsReducer';
import currentProjectSlugReducer from 'reducers/currentProjectSlugReducer';
import Components from 'components/hoc/Components';
import Template from 'templates/Template';
import ProjectCarouselContainer from 'containers/ProjectCarouselContainer';
import ProjectDetailContainer from 'containers/ProjectDetailContainer';

class WorkTemplate extends React.PureComponent {

	getChildContext () {

		const { routeParams } = this.props;

		return {
			routeParams
		};
	}

	componentWillMount () {

		const { routeParams: id } = this.props;

		setCurrentProjectSlug(id);
	}

	render () {

		const { children, heading, routeParams, title } = this.props,
			{ router: { location: { query: routeQuery } } } = this.context;

		console.log(heading, routeParams, routeQuery, title);

		return (
			<main>
				{ children }
				<ProjectCarouselContainer />
				<ProjectDetailContainer />
			</main>
		);
	}
}

WorkTemplate.defaultProps = {};

WorkTemplate.propTypes = {
	children: React.PropTypes.node,
	heading: React.PropTypes.string.isRequired,
	routeParams: React.PropTypes.object.isRequired,
	title: React.PropTypes.string.isRequired
};

WorkTemplate.contextTypes = {
	router: React.PropTypes.object
};

WorkTemplate.childContextTypes = {
	routeParams: React.PropTypes.object
};

const WrappedWorkTemplate = Template(Components(WorkTemplate));

WrappedWorkTemplate.onInit = (store, routeParams) => {

	const { id } = routeParams;

	store.registerReducers({
		currentProjectSlug: currentProjectSlugReducer,
		projects: projectsReducer 
	});

	return Promise.all([
		store.dispatch(getProjects())
	].concat(id ? store.dispatch(getProject(id)) : []));
};

export default WrappedWorkTemplate;