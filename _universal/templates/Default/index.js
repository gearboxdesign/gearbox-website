import React from 'react';
import Template from 'templates/Template';

function DefaultTemplate (props) {

	const { children } = props;

	return (
		<main>
			{ children }
		</main>
	);
}

DefaultTemplate.defaultProps = {};

DefaultTemplate.propTypes = {
	children: React.PropTypes.node
};

export default Template(DefaultTemplate);