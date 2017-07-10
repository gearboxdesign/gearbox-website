import React from 'react';
import { get, noop } from 'lodash';
import { connect } from 'react-redux';
import { getProject, getProjects } from 'actions/actionCreators';
import { ANIMATION_DELAY } from 'constants/animations';
import projectsReducer from 'reducers/projectsReducer';
import currentProjectSlugReducer from 'reducers/currentProjectSlugReducer';
import Template from 'templates/Template';
import ProjectsContainer from 'containers/ProjectsContainer';
import ProjectDetailContainer from 'containers/ProjectDetailContainer';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

class WorkTemplate extends React.PureComponent {

	componentDidMount () {

		const { currentProjectSlug,
			getProjectHandler,
			routeData: { params: { slug } }
		} = this.props;

		getProjectHandler(slug || currentProjectSlug);
	}

	render () {

		const { 
			bemClass,
			children,
			className,
			getProjectHandler,
			routeData: { params: { slug } }
		} = this.props,
			index = React.Children.count(children);

		return (
			<main className={ className }>
				{ children }
				<div className={ bemClass.element('projects') }>
					<div className={ bemClass.element('projects-inner') }>
						<div
							className={ bemClass.element('projects-stripe') }
							style={ {
								animationDelay: `${ index * ANIMATION_DELAY }s`
							} }
						/>
						<ProjectsContainer
							getProjectHandler={ getProjectHandler }
							index={ index }
						/>
						<ProjectDetailContainer
							index={ index }
						/>
					</div>
				</div>
			</main>
		);
	}
}

WorkTemplate.defaultProps = {
	className: 't-work'
};

WorkTemplate.propTypes = {
	bemClass: propTypes.bemClass,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
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

const WrappedWorkTemplate = connect(mapStateToProps, mapDispatchToProps)(Template(BemClasses(WorkTemplate)));

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