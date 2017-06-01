import React from 'react';
import Template from 'templates/Template';

function DefaultTemplate (props) {

	const { children,
		heading,
		routeData,
		router: { location: { query: routeQuery } } } = props;

	console.log(heading, routeData, routeQuery);

	return (
		<main>
			{ children }
		</main>
	);
}

DefaultTemplate.defaultProps = {};

DefaultTemplate.propTypes = {
	children: React.PropTypes.node,
	heading: React.PropTypes.string.isRequired,
	routeData: React.PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired
};

export default Template(DefaultTemplate);