import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/Animate';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ContactEmail (props) {

	/* eslint-disable no-unused-vars */
	const { aria, bemClass, className, index } = props,
		ariaAttrs = getAriaAttrs(aria);

	/* eslint-enable */

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						type={ Animate.SLIDE_LEFT }
					>
						<p>Name, Email</p>
					</Animate>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						type={ Animate.SLIDE_RIGHT }
					>
						<p>Message</p>
					</Animate>
				</GridCol>
			</GridRow>
		</div>
	);
}

ContactEmail.defaultProps = {
	className: 'c-contact-email'
};

ContactEmail.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default BemClasses(ContactEmail);