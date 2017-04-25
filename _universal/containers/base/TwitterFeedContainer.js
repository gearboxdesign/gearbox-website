import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { getTweets } from 'actions/actionCreators';
import tweetsReducer from 'reducers/tweetsReducer';
import TwitterFeed from 'components/base/TwitterFeed';

function TwitterFeedContainer (props) {

	return (
		<TwitterFeed { ...props } />
	);
}

function mapStateToProps (state) {

	const { tweets } = state;

	return {
		tweets
	};
}

TwitterFeedContainer.defaultProps = {};

TwitterFeedContainer.propTypes = {};

const WrappedTwitterFeedContainer = connect(mapStateToProps)(TwitterFeedContainer);

WrappedTwitterFeedContainer.onInit = (store) => {

	store.registerReducers({ tweets: tweetsReducer });

	return store.dispatch(getTweets());
};

export default WrappedTwitterFeedContainer;