import React from 'react';
import { setProject, setProjects } from 'actions/actionCreators';
import projectsReducer from 'reducers/projectsReducer';
import Components from 'components/hoc/Components';
import Template from 'templates/Template';

class WorkTemplate extends React.PureComponent {

	getChildContext () {

		const { routeParams } = this.props;

		return {
			routeParams
		};
	}

	render () {

		const { children, heading, routeParams, title } = this.props,
			{ router: { location: { query: routeQuery } } } = this.context;

		console.log(heading, routeParams, routeQuery, title);

		return (
			<main>
				{ children }
				<div>Project Slider</div>
				<div>Project Detail</div>
			</main>
		);
	}
}

WorkTemplate.defaultProps = {};

WorkTemplate.propTypes = {
	children: React.PropTypes.node,
	heading: React.PropTypes.string.isRequired,
	routeParams: React.PropTypes.object,
	title: React.PropTypes.string.isRequired
};

WorkTemplate.contextTypes = {
	router: React.PropTypes.object
};

WorkTemplate.childContextTypes = {
	routeParams: React.PropTypes.object
};

const WrappedWorkTemplate = Template(Components(WorkTemplate));

WrappedWorkTemplate.onInit = (store) => {

	store.registerReducers({ projects: projectsReducer });

	return store.dispatch(setProjects());

	// return new Promise((res) => {

	// 	setTimeout(() => {
	// 		console.log('done work template');
	// 		res();
	// 	}, 1000);
	// });
};

export default WrappedWorkTemplate;