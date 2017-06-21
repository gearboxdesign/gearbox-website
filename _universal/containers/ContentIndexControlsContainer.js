import { get } from 'lodash';
import { connect } from 'react-redux';
import ContentIndexControls from 'components/ui/ContentIndexControls';

function mapStateToProps (state) {

	const { translations } = state;

	return {
		nextLabel: get(translations, 'data.pagination.next'),
		previousLabel: get(translations, 'data.pagination.previous')
	};
}

export default connect(mapStateToProps)(ContentIndexControls);