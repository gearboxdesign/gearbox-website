import React from 'react';
import Components from 'components/hoc/Components';
import Template from 'templates/Template';

class DefaultTemplate extends React.PureComponent {

	getChildContext () {

		const { routeData } = this.props;

		return {
			routeData
		};
	}

	render () {

		const { children, heading, routeData, title } = this.props,
			{ router: { location: { query: routeQuery } } } = this.context;

		console.log(heading, routeData, routeQuery, title);

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
	routeData: React.PropTypes.object.isRequired,
	title: React.PropTypes.string.isRequired
};

DefaultTemplate.contextTypes = {
	router: React.PropTypes.object
};

DefaultTemplate.childContextTypes = {
	routeData: React.PropTypes.object
};

export default Template(Components(DefaultTemplate));