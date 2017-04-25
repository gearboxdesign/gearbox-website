import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
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

	const { aria, bemClass, className, tweets } = props,
		{ data, errors } = tweets,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
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
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	tweets: propTypes.asyncState
};

export default BemClasses(Tweets);