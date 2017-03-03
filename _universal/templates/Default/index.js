import React from 'react';
import Components from 'components/hoc/Components';
import Template from 'templates/hoc/Template';

class Default extends React.PureComponent {

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

Default.defaultProps = {};

Default.propTypes = {
	children: React.PropTypes.node,
	heading: React.PropTypes.string.isRequired,
	routeParams: React.PropTypes.object,
	title: React.PropTypes.string.isRequired
};

Default.contextTypes = {
	router: React.PropTypes.object
};

Default.childContextTypes = {
	routeParams: React.PropTypes.object
};

export default Template(Components(Default));