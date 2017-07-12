import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import FeaturedLink from 'components/ui/FeaturedLink';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function FeaturedLinks (props) {

	const { aria, bemClass, className, index, links } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			{ links.map(getFeaturedLinkItem(bemClass, index)) }
		</div>
	);
}

function getFeaturedLinkItem (bemClass, index) {

	return (props) => {

		const { meta: { id } } = props; // eslint-disable-line react/prop-types

		return (
			<Animate
				classes={ bemClass.element('item') }
				index={ index }
				key={ id }
				type={ Animate.FADE }
			>
				<FeaturedLink { ...props } />
			</Animate>
		);
	};
}

FeaturedLinks.defaultProps = {
	className: 'c-featured-links',
	index: 0
};

FeaturedLinks.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		link: propTypes.link.isRequired
	})).isRequired
};

export default BemClasses(FeaturedLinks);