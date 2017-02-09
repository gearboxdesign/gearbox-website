import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import Editorial from 'components/Editorial';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SpecialtiesDetail (props) {

	const { aria, bemClass, className, description, heading, index, subHeading } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<article
			className={ className }
			{ ...ariaAttrs }
		>
			<h2 className={ bemClass.element('heading') }>{ heading }</h2>
			<h3 className={ bemClass.element('sub-heading') }>{ subHeading }</h3>
			<Editorial
				classes={ bemClass.element('description') }
				content={ description }
			/>
		</article>
	);
}

SpecialtiesDetail.defaultProps = {
	className: 'c-specialties-detail'
};

SpecialtiesDetail.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	subHeading: React.PropTypes.string.isRequired
};

export default BemClasses(SpecialtiesDetail);