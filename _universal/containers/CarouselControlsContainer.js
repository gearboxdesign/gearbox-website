import { get } from 'lodash';
import { connect } from 'react-redux';
import CarouselControls from 'components/ui/CarouselControls';

function mapStateToProps (state) {

	const { translations } = state;

	return {
		nextLabel: get(translations, 'pagination.next'),
		previousLabel: get(translations, 'pagination.previous')
	};
}

export default connect(mapStateToProps)(CarouselControls);