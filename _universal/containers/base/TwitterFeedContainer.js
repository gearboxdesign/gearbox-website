import React from 'react'; // eslint-disable-line no-unused-vars
import { getTweets } from 'actions/actionCreators';
import tweetsReducer from 'reducers/tweetsReducer';
import TwitterFeed from 'components/base/TwitterFeed';

export default function TwitterFeedContainer (props) {

	return <TwitterFeed { ...props } />;
}

TwitterFeedContainer.defaultProps = {};

TwitterFeedContainer.propTypes = {};

TwitterFeedContainer.onInit = (store) => {

	store.registerReducers({ tweets: tweetsReducer });

	return store.dispatch(getTweets());
};