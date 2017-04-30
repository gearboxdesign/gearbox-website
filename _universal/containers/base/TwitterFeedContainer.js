import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { getTweets } from 'actions/actionCreators';
import tweetsReducer from 'reducers/tweetsReducer';
import TwitterFeed from 'components/base/TwitterFeed';

class TwitterFeedContainer extends React.PureComponent {

	componentDidMount () {

		const { getTweetsHandler } = this.props;

		// getTweetsHandler();
	}

	render () {

		return <TwitterFeed { ...this.props } />;
	}
}

function mapStateToProps (state) {

	const { tweets } = state;

	return { tweets };
}

function mapDispatchToProps (dispatch) {

	return {
		getTweetsHandler: () => {
			return dispatch(getTweets());
		}
	};
}

TwitterFeedContainer.defaultProps = {};

TwitterFeedContainer.propTypes = {
	getTweetsHandler: React.PropTypes.func.isRequired
};

const WrappedTwitterFeedContainer = connect(mapStateToProps, mapDispatchToProps)(TwitterFeedContainer);

WrappedTwitterFeedContainer.onInit = (store) => {

	store.registerReducers({ tweets: tweetsReducer });

	return store.dispatch(getTweets());
};

export default WrappedTwitterFeedContainer;