import React from 'react'; // eslint-disable-line no-unused-vars
import { ANIMATION_DELAY } from 'constants/animations';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Editorial from 'components/Editorial';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function PageHeader (props) {

	const { aria, bemClass, className, description, heading, index } = props,
		ariaAttrs = getAriaAttrs(aria),
		styles = {
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
						<h1
							className={ bemClass.element('heading') }
							style={ styles }
						>{ heading }</h1>
					</div>
					<Editorial
						classes={ bemClass.element('description') }
						content={ description }
						styles={ styles }
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