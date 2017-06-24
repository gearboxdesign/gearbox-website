import React from 'react';
import { partial } from 'lodash';
import bem from 'modules/bem';
import { ACTIVE_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import ToggleButton from 'components/ui/Buttons/ToggleButton';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ContentIndexControls (props) {

	const { aria,
		bemClass,
		className,
		controlsId,
		count,
		index,
		nextLabel,
		previousLabel,
		skipContentHandler
	} = props,
		ariaAttrs = getAriaAttrs(aria),
		buttonBemClass = bem(bemClass.element('button')),
		active = index > 0;

	return (
		<div
			className={ combineClasses(className, active && ACTIVE_CLASS).join(' ') }
			{ ...ariaAttrs }
		>
			<ToggleButton
				aria={ { controls: controlsId } }
				classes={ buttonBemClass.modifiers('prev') }
				clickHandler={ partial(skipContentHandler, -1) }
				disabled={ !active || index <= 1 }
				label={ previousLabel }
				modifiers={ 'invert' }
			/>
			<p className={ bemClass.element('index') }>
				<span className={ bemClass.element('index-current') }>{ index > 0 ? index : '-' }</span>
				<span className={ bemClass.element('index-max') }>{ count }</span>
			</p>
			<ToggleButton
				aria={ { controls: controlsId } }
				classes={ buttonBemClass.modifiers('next') }
				clickHandler={ partial(skipContentHandler, 1) }
				disabled={ !active || index >= count }
				label={ nextLabel }
				modifiers={ 'invert' }
			/>
		</div>
	);
}

ContentIndexControls.defaultProps = {
	className: 'c-content-index-controls',
	count: 0,
	index: 0
};

ContentIndexControls.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	controlsId: React.PropTypes.string.isRequired,
	count: React.PropTypes.number.isRequired,
	index: React.PropTypes.number.isRequired,
	nextLabel: React.PropTypes.string.isRequired,
	previousLabel: React.PropTypes.string.isRequired,
	skipContentHandler: React.PropTypes.func.isRequired
};

export default BemClasses(ContentIndexControls);