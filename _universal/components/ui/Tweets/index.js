import React from 'react';
import { get } from 'lodash';
import { LOADING_CLASS } from 'constants/cssClasses';
import BemClasses from 'components/hoc/BemClasses';
import combineClasses from 'modules/combineClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import ErrorComponent from 'components/ui/Error';
import Tweet from 'components/ui/Tweet';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Tweets (props) {

	const { aria, className, tweets } = props,
		loading = get(tweets, 'loading'),
		data = get(tweets, 'data'),
		errors = get(tweets, 'errors'),
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ combineClasses(className, loading && LOADING_CLASS).join(' ') }
			{ ...ariaAttrs }
		>
			{ errors ?
				<ErrorComponent errors={ errors } /> :
				data && data.map(getTweets)
			}
		</div>
	);
}

function getTweets (tweetProps) {

	const { id } = tweetProps;

	return (
		<Tweet
			key={ id }
			{ ...tweetProps }
		/>
	);
}

Tweets.defaultProps = {
	className: 'c-tweets'
};

Tweets.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	tweets: propTypes.asyncState
};

export default BemClasses(Tweets);