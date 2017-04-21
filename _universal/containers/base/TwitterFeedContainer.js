import React from 'react'; // eslint-disable-line no-unused-vars
import { TWEETS } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import TwitterFeed from 'components/base/TwitterFeed';

export default function TwitterFeedContainer (props) {

	return (
		<TwitterFeed { ...props } />
	);
}

TwitterFeedContainer.defaultProps = {};

TwitterFeedContainer.propTypes = {};

TwitterFeedContainer.onInit = (store) => {

	store.registerReducers({
		tweets: tweetsReducer
	});

	return getJSON(TWEETS)
		.then((data) => {
			console.log('data');
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};