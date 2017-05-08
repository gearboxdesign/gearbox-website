import React from 'react';
import { connect } from 'react-redux';
import { getProject, getProjects } from 'actions/actionCreators';
import projectsReducer from 'reducers/projectsReducer';
import currentProjectSlugReducer from 'reducers/currentProjectSlugReducer';
import Components from 'components/hoc/Components';
import Template from 'templates/Template';
import ProjectCarouselContainer from 'containers/ProjectCarouselContainer';
import ProjectDetailContainer from 'containers/ProjectDetailContainer';

class WorkTemplate extends React.PureComponent {

	getChildContext () {

		const { routeData } = this.props;

		return {
			routeData
		};
	}

	componentDidMount () {

		const { routeData: { params: { slug } }, getProjectHandler } = this.props;

		getProjectHandler(slug);
	}

	render () {

		const { children, heading, routeData, title } = this.props,
			{ router: { location: { query: routeQuery } } } = this.context,
			{ lang, url } = routeData,
			routeUrl = lang ? `/${ lang }${ url }` : url;

		console.log(heading, routeData, routeQuery, title);

		return (
			<main>
				{ children }
				<ProjectCarouselContainer routeUrl={ routeUrl } />
				<ProjectDetailContainer />
			</main>
		);
	}
}

WorkTemplate.defaultProps = {};

WorkTemplate.propTypes = {
	children: React.PropTypes.node,
	getProjectHandler: React.PropTypes.func.isRequired,
	heading: React.PropTypes.string.isRequired,
	routeData: React.PropTypes.object.isRequired,
	title: React.PropTypes.string.isRequired
};

WorkTemplate.contextTypes = {
	router: React.PropTypes.object
};

WorkTemplate.childContextTypes = {
	routeData: React.PropTypes.object
};

function mapDispatchToProps (dispatch) {

	return {
		getProjectHandler: (slug) => {
			dispatch(getProject(slug));
		}
	};
}

const WrappedWorkTemplate = connect(null, mapDispatchToProps)(Template(Components(WorkTemplate)));

WrappedWorkTemplate.onInit = (store, routeData) => {

	const { params: { slug } } = routeData;

	store.registerReducers({
		currentProjectSlug: currentProjectSlugReducer,
		projects: projectsReducer
	});

	return Promise.all([
		store.dispatch(getProjects())
	].concat(slug ? store.dispatch(getProject(slug)) : []));
};

export default WrappedWorkTemplate;