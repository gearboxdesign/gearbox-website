import React from 'react';
import bem from 'modules/bem';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import ToggleButton from 'components/ui/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function CarouselControls (props) {

	const { aria,
		bemClass,
		controlsId,
		className,
		count,
		index,
		nextLabel,
		previousLabel,
		skipSlideHandler
	} = props,
		ariaAttrs = getAriaAttrs(aria),
		buttonBemClass = bem(bemClass.element('button'));

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<ToggleButton
				aria={ { controls: controlsId } }
				classes={ buttonBemClass.modifiers('prev') }
				clickHandler={ skipSlideHandler(-1) } // eslint-disable-line no-magic-numbers
				disabled={ !count || index === 0 }
				label={ previousLabel }
			/>
			<ToggleButton
				aria={ { controls: controlsId } }
				classes={ buttonBemClass.modifiers('next') }
				clickHandler={ skipSlideHandler(1) } // eslint-disable-line no-magic-numbers
				disabled={ !count || index === (count - 1) }
				label={ nextLabel }
			/>
		</div>
	);
}

CarouselControls.defaultProps = {
	className: 'c-carousel-controls',
	count: 0,
	index: 0
};

CarouselControls.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	controlsId: React.PropTypes.string.isRequired,
	count: React.PropTypes.number.isRequired,
	index: React.PropTypes.number.isRequired,
	nextLabel: React.PropTypes.string.isRequired,
	previousLabel: React.PropTypes.string.isRequired,
	skipSlideHandler: React.PropTypes.func.isRequired
};

export default BemClasses(CarouselControls);