import React from 'react';
import { ANIMATION_DELAY } from 'constants/animations';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Editorial from 'components/ui/Editorial';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Heading from 'components/ui/Heading';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function PageHeader (props) {

	const { aria, bemClass, className, description, heading, index } = props,
		ariaAttrs = getAriaAttrs(aria),
		style = {
			'animationDelay': `${ index * ANIMATION_DELAY }s`
		};

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow>
				<GridCol count={ 12 }>
					<div className={ bemClass.element('heading-container') }>
						<Heading
							classes={ bemClass.element('heading') }
							style={ style }
							text={ heading }
						/>
					</div>
					<Editorial
						classes={ bemClass.element('description') }
						content={ description }
						style={ style }
					/>
				</GridCol>
			</GridRow>
		</div>
	);
}

PageHeader.defaultProps = {
	className: 'c-page-header',
	index: 0
};

PageHeader.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default BemClasses(PageHeader);