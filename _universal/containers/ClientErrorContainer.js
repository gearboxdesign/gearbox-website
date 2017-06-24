import { get } from 'lodash';
import { connect } from 'react-redux';
import { setClientError } from 'actions/actionCreators';
import ClientError from 'components/ui/ClientError';

function mapStateToProps (state) {

	const { translations, clientError } = state,
		statusCode = clientError ? clientError.status || 0 : null,
		message = clientError ? get(translations, `data.errors.types.${ statusCode.toString() }`) : null;

	return {
		message,
		heading: get(translations, 'data.errors.error'),
		statusCode
	};
}

function mapDispatchToProps (dispatch) {

	return {
		clearHandler: () => {
			return dispatch(setClientError(null));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientError);