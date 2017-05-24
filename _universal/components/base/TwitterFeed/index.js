import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import Editorial from 'components/ui/Editorial';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Heading from 'components/ui/Heading';
import Tweets from 'components/ui/Tweets';
import TwitterBadge from 'components/ui/Badges/TwitterBadge';
import SocialLink from 'components/ui/Links/SocialLink';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function TwitterFeed (props) {

	const { aria,
		bemClass,
		className,
		description,
		heading,
		index,
		tweetButton,
		tweets
	} = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						modifiers={ 'full-height' }
						type={ Animate.SLIDE_LEFT }
					>
						<div className={ bemClass.element('content') }>
							<Heading
								classes={ bemClass.element('heading') }
								level={ 2 }
								text={ heading }
							/>
							<Editorial
								classes={ bemClass.element('description') }
								content={ description }
							/>
							<SocialLink
								modifiers={ ['twitter-tweet', 'expanded'] }
								{ ...tweetButton }
							/>
							<TwitterBadge
								classes={ bemClass.element('twitter-badge') }
								index={ index + 1 }
							/>
						</div>
					</Animate>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						modifiers={ 'full-height' }
						type={ Animate.FADE }
					>
						<Tweets tweets={ tweets } />
					</Animate>
				</GridCol>
			</GridRow>
		</div>
	);
}

TwitterFeed.defaultProps = {
	className: 'c-twitter-feed'
};

TwitterFeed.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	tweetButton: React.PropTypes.object.isRequired,
	tweets: propTypes.asyncState
};

export default BemClasses(TwitterFeed);