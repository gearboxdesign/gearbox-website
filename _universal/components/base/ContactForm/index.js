import React from 'react'; // eslint-disable-line no-unused-vars
import { trim } from 'lodash';
import bem from 'modules/bem';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import Editorial from 'components/ui/Editorial';
import Form from 'components/lib/Form/Form';
import FormInput from 'components/lib/Form/FormInput';
import FormTextArea from 'components/lib/Form/FormTextArea';
import FormSubmit from 'components/lib/Form/FormSubmit';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Heading from 'components/ui/Heading';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const SUBMITTED_CLASS = 'is-submitted',
	TRANSLATE_OFFSET = 30;

class ContactForm extends React.PureComponent {

	componentDidUpdate () {

		const { reply } = this.props;

		if (this.message && this.replyInner) {
			this.message.style.transform = reply ?
				`translateY(-${ this.replyInner.offsetHeight + TRANSLATE_OFFSET }px)` :
				'none';
		}
	}

	render () {

		const { aria,
			bemClass,
			className,
			description,
			email,
			heading,
			index,
			message,
			name,
			reply,
			submitHandler
		} = this.props,
			ariaAttrs = getAriaAttrs(aria);

		return (
			<div
				className={ trim(`${ className } ${ reply ? SUBMITTED_CLASS : '' }`) }
				{ ...ariaAttrs }
			>
				<Form
					action="POST"
					autoComplete={ false }
					submitHandler={ submitHandler }
					submitLabel={ 'Submit' }
				>
					<fieldset>
						<legend>Form Example</legend>
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
									<div className={ bem(bemClass.element('content')).modifiers('texture') }>
										<Heading
											classes={ bemClass.element('heading') }
											level={ 2 }
										>
											{ heading }
										</Heading>
										<Editorial
											classes={ bemClass.element('description') }
											content={ description }
										/>
										<FormInput
											id="name"
											label="Name:"
											validators={ ['required'] }
											value={ name }
										/>
										<FormInput
											id="email"
											label="Email:"
											validators={ ['required', 'isEmail'] }
											value={ email }
										/>
									</div>
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
									<div className={ bem(bemClass.element('content')).modifiers('column') }>
										<div
											className={ bemClass.element('message') }
											ref={ (element) => { this.message = element; } } // eslint-disable-line react/jsx-no-bind, max-len
										>
											<FormTextArea
												classes={ `${ bemClass.element('message') }-inner` }
												id="message"
												label="Message"
												rows={ 6 }
												validators={ ['required'] }
												value={ message }
											/>
										</div>
										<div
											aria-hidden={ !reply }
											className={ bemClass.element('reply') }
										>
											<p
												className={ `${ bemClass.element('reply') }-inner` }
												ref={ (element) => { this.replyInner = element; } } // eslint-disable-line react/jsx-no-bind, max-len
											>{ reply }</p>
										</div>
										<FormSubmit
											classes={ bemClass.element('submit') }
											value="Send It"
										/>
									</div>
								</Animate>
							</GridCol>
						</GridRow>
					</fieldset>
				</Form>
			</div>
		);
	}

}

ContactForm.defaultProps = {
	className: 'c-contact-form',
	sent: false
};

ContactForm.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	email: React.PropTypes.string,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	message: React.PropTypes.string,
	name: React.PropTypes.string,
	reply: React.PropTypes.string,
	submitHandler: React.PropTypes.func.isRequired
};

export default BemClasses(ContactForm);