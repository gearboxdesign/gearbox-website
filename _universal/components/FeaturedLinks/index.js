import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import FeaturedLink from 'components/FeaturedLink';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function FeaturedLinks (props) {

	const { aria, className, links } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow>
				{ links.map(getFeaturedLink) }
			</GridRow>
		</div>
	);
}

function getFeaturedLink (props) {

	const { meta: { id } } = props; // eslint-disable-line react/prop-types

	return (
		<GridCol
			breakpoints={ [{
				breakpoint: 'medium',
				count: 4
			}] }
			count={ 12 }
			key={ id }
		>
			<FeaturedLink { ...props } />
		</GridCol>
	);
}

FeaturedLinks.defaultProps = {
	className: 'c-featured-links'
};

FeaturedLinks.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		link: propTypes.link.isRequired
	})).isRequired
};

export default BemClasses(FeaturedLinks);