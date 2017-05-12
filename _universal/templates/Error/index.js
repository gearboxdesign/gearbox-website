import React from 'react';
import Template from 'templates/Template';
import ErrorComponent from 'components/ui/Error';

// TODO: Apply styling.
function ErrorTemplate (props) {

	const { errors, statusCode } = props;

	return (
		<main>
			<h1>{ statusCode }</h1>
			<ErrorComponent errors={ errors } />
		</main>
	);
}

ErrorTemplate.defaultProps = {};

ErrorTemplate.propTypes = {
	errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	statusCode: React.PropTypes.number.isRequired
};

ErrorTemplate.contextTypes = {
	router: React.PropTypes.object
};

export default Template(ErrorTemplate);