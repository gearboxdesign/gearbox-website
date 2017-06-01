import React from 'react';
import Template from 'templates/Template';
import PageError from 'components/ui/PageError';

function ErrorTemplate (props) {

	// TODO: Translate 'Error'.
	return (
		<main>
			<PageError
				heading="Error"
				{ ...props }
			/>
		</main>
	);
}

ErrorTemplate.defaultProps = {};

ErrorTemplate.propTypes = {
	errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	statusCode: React.PropTypes.number.isRequired
};

export default Template(ErrorTemplate);