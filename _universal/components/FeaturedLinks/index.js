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

	const { className, links } = props;

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
	className: React.PropTypes.string.isRequired,
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		link: propTypes.link.isRequired
	})).isRequired
};

export default BemClasses(FeaturedLinks);