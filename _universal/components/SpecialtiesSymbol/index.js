import React from 'react'; // eslint-disable-line no-unused-vars
import { padStart } from 'lodash';
import ImageContainer from 'containers/ImageContainer';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function SpecialtiesSymbol (props) {

	const { aria, bemClass, className, icon, index, title, transitionDuration } = props,
		ariaAttrs = getAriaAttrs(aria),
		figNum = index + 1,
		figLabel = figNum < 10 ? padStart(figNum.toString(), 2, '0') : figNum; // eslint-disable-line no-magic-numbers

	return (
		<figure
			className={ className }
			{ ...ariaAttrs }
		>
			<div
				className={ bemClass.element('cog') }
				role="presentation"
				style={ {
					animationDuration: `${ transitionDuration }s`
				} }
			/>
			<div className={ bemClass.element('icon') }>
				<ImageContainer
					{ ...icon }
				/>
				<figcaption className={ bemClass.element('caption') }>
					<span className={ bemClass.element('caption-sub') }>{ figLabel }</span>
					<span className={ bemClass.element('caption-sub') }>{ title }</span>
				</figcaption>
			</div>
		</figure>
	);
}

SpecialtiesSymbol.defaultProps = {
	className: 'c-specialties-symbol'
};

SpecialtiesSymbol.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	icon: propTypes.image.isRequired,
	index: React.PropTypes.number.isRequired,
	title: React.PropTypes.string.isRequired,
	transitionDuration: React.PropTypes.number.isRequired
};

export default BemClasses(SpecialtiesSymbol);