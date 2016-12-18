import React from 'react';
import Components from 'components/hoc/Components';

class RouteComponentWrapper extends React.Component {

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
			</main>
		);
	}
}

RouteComponentWrapper.defaultProps = {};

RouteComponentWrapper.propTypes = {
	children: React.PropTypes.any,
	heading: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	routeParams: React.PropTypes.object
};

RouteComponentWrapper.contextTypes = {
	router: React.PropTypes.object
};

RouteComponentWrapper.childContextTypes = {
	routeParams: React.PropTypes.object
};

export default Components(RouteComponentWrapper);

