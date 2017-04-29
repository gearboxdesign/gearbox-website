import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
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

const LOADING_CLASS = '.is-loading';

function Tweets (props) {

	const { _loading,
			aria,
			className,
			data,
			errors
		} = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ combineClasses(className, _loading && LOADING_CLASS).join(' ') }
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
	_loading: React.PropTypes.bool,
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	data: React.PropTypes.array,
	errors: React.PropTypes.arrayOf([React.PropTypes.string])
};

export default BemClasses(Tweets);