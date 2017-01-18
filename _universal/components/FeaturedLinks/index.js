import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
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

	const { bemClass, className, links } = props;

	return (
		<div
			className={ className }
		>
			<GridRow>
				{ links.map(getFeaturedLink) }
			</GridRow>
		</div>
	);
}

function getFeaturedLink (featuredLink, i) {

	return (
		<GridCol
			breakpoints={ [{
				breakpoint: 'medium',
				count: 4
			}] }
			count={ 12 }
			key={ i }
		>
			<FeaturedLink { ...featuredLink } />
		</GridCol>
	);
}

FeaturedLinks.defaultProps = {
	className: 'c-featured-links'
};

FeaturedLinks.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		link: propTypes.link.isRequired
	})).isRequired
};

export default BemClasses(FeaturedLinks);