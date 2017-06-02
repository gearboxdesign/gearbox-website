import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import Template from 'templates/Template';
import PageError from 'components/ui/PageError';

function ErrorTemplate (props) {

	const { translations } = props;

	return (
		<main>
			<PageError
				heading={ get(translations, 'errors.heading') }
				{ ...props }
			/>
		</main>
	);
}

ErrorTemplate.defaultProps = {};

ErrorTemplate.propTypes = {
	errors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired, // eslint-disable-line react/no-unused-prop-types, max-len
	statusCode: React.PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
	translations: React.PropTypes.object.isRequired
};

function mapStateToProps (state) {

	const { translations } = state;

	return {
		translations
	};
}

export default connect(mapStateToProps)(Template(ErrorTemplate));