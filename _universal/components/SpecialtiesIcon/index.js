import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import ImageContainer from 'containers/ImageContainer';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SpecialtiesIcon (props) {

	const { aria, bemClass, className, icon, index, title } = props,
		ariaAttrs = getAriaAttrs(aria);

	// TODO: Check caption linkage.
	return (
		<figure className={ className }>
			<div className={ bemClass.element('icon') }>
				<ImageContainer
					{ ...icon }
				/>
				<figcaption className={ bemClass.element('caption') }>{ index }</figcaption>
			</div>
		</figure>
	);
}

SpecialtiesIcon.defaultProps = {
	className: 'c-specialties-icon'
};

SpecialtiesIcon.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	icon: React.PropTypes.object.isRequired, // TODO: Replace with custom 'image' PropType.
	index: React.PropTypes.number.isRequired,
	title: React.PropTypes.string.isRequired
};

export default BemClasses(SpecialtiesIcon);