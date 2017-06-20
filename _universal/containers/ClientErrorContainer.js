import { get } from 'lodash';
import { connect } from 'react-redux';
import { ERRORS } from 'constants/http';
import ClientError from 'components/ui/ClientError';

const dev = process.env.NODE_ENV === 'development';

function mapStateToProps (state) {

	const { translations, clientError } = state,
		statusCode = clientError ? clientError.status || 0 : null,
		errors = clientError ? 
			clientError.errors || [
				(dev && (clientError.message || clientError.toString())) ||
				ERRORS[statusCode.toString()]
			] :
			null;

	return {
		errors,
		heading: get(translations, 'data.errors.heading'),
		statusCode
	};
}

export default connect(mapStateToProps)(ClientError);