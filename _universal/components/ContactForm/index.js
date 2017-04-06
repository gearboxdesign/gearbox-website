import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/Animate';
import Form from 'libComponents/Form/Form';
import FormInput from 'libComponents/Form/FormInput';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ContactForm (props) {

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
						<Form
							action="POST"
							submitHandler={ (...args) => { console.log(args); } }
							submitLabel={ 'Submit' }
						>
							<fieldset>
								<legend>Add / Edit Sub-Tech Form</legend>
								<FormInput
									id="test"
									label="Test"
									validators={ ['required'] }
									value="test"
								/>
							</fieldset>
						</Form>
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

ContactForm.defaultProps = {
	className: 'c-contact-form'
};

ContactForm.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default BemClasses(ContactForm);