import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Tweets from 'components/ui/Tweets';

function TweetsContainer (props) {

	return <Tweets { ...props } />;
}

function mapStateToProps (state) {

	const { tweets } = state;

	return { ...tweets };
}

TweetsContainer.defaultProps = {};

TweetsContainer.propTypes = {};

export default connect(mapStateToProps)(TweetsContainer);