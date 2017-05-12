import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ActionLink from 'components/ui/Links/ActionLink';
import Heading from 'components/ui/Heading';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function FeaturedLinks (props) {

	const { aria, bemClass, caption, className, heading, link: { label, url } } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<Heading
				classes={ bemClass.element('heading') }
				level={ 2 }
			>
				{ heading }
			</Heading>
			<p className={ bemClass.element('caption') }>{ caption }</p>
			<ActionLink
				label={ label }
				modifiers={ ['button', 'button-invert'] }
				url={ url }
			/>
		</div>
	);
}

FeaturedLinks.defaultProps = {
	className: 'c-featured-link'
};

FeaturedLinks.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	link: propTypes.link.isRequired
};

export default BemClasses(FeaturedLinks);