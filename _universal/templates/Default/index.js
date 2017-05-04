import React from 'react';
import Components from 'components/hoc/Components';
import Template from 'templates/Template';

class DefaultTemplate extends React.PureComponent {

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

DefaultTemplate.defaultProps = {};

DefaultTemplate.propTypes = {
	children: React.PropTypes.node,
	heading: React.PropTypes.string.isRequired,
	routeParams: React.PropTypes.object.isRequired,
	title: React.PropTypes.string.isRequired
};

DefaultTemplate.contextTypes = {
	router: React.PropTypes.object
};

DefaultTemplate.childContextTypes = {
	routeParams: React.PropTypes.object
};

export default Template(Components(DefaultTemplate));