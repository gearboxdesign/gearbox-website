import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import bem from 'modules/bem';
import combineClasses from 'modules/combineClasses';
import model from 'models/contact';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import Editorial from 'components/ui/Editorial';
import ErrorComponent from 'components/ui/Error';
import Form from 'components/lib/Form/Form';
import FormInput from 'components/lib/Form/FormInput';
import FormTextArea from 'components/lib/Form/FormTextArea';
import FormSubmit from 'components/lib/Form/FormSubmit';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Heading from 'components/ui/Heading';

let TweenLite;

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
	TweenLite = require('gsap').TweenLite;
}

/* eslint-enable */

const MESSAGE_DURATION = 3,
	SUBMITTED_CLASS = 'is-submitted',
	LOADING_CLASS = 'is-loading',
	TRANSLATE_OFFSET = 30,
	TWEEN_DURATION = 0.5;


class ContactForm extends React.PureComponent {

	componentDidUpdate () {

		const { clearHandler, submitted } = this.props;

		if (this.message && this.replyInner && TweenLite) {
			TweenLite.to(this.message, TWEEN_DURATION, {
				css: { y: submitted ? (this.replyInner.offsetHeight + TRANSLATE_OFFSET) * -1 : 0 }
			});
		}

		if (submitted) {
			setTimeout(clearHandler, MESSAGE_DURATION * 1000);
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
			submitHandler,
			submitted
		} = this.props,
			ariaAttrs = getAriaAttrs(aria),
			data = get(reply, 'data'),
			errors = get(reply, 'errors'),
			loading = get(reply, '_loading');

		// TODO: Add action url to Form.
		return (
			<div
				className={ className }
				{ ...ariaAttrs }
			>
				<Form
					action="#"
					classes={ combineClasses(submitted && SUBMITTED_CLASS, loading && LOADING_CLASS).join(' ') }
					method="POST"
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
											id={ get(model, 'name.id') }
											label="Name:"
											validators={ get(model, 'name.validators') }
											value={ name }
										/>
										<FormInput
											id={ get(model, 'email.id') }
											label="Email:"
											validators={ get(model, 'email.validators') }
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
									<div className={ bem(bemClass.element('content')).modifiers('message') }>
										<div
											className={ bemClass.element('message') }
											ref={ (element) => { this.message = element; } } // eslint-disable-line react/jsx-no-bind, max-len
										>
											<FormTextArea
												classes={ `${ bemClass.element('message') }-inner` }
												id={ get(model, 'message.id') }
												label="Message"
												rows={ 6 }
												validators={ get(model, 'message.validators') }
												value={ message }
											/>
										</div>
										<div
											aria-hidden={ !(data || errors) }
											className={ bem(bemClass.element('reply')).modifiers(errors && 'error') }
										>
											<div
												className={ `${ bemClass.element('reply') }-inner` }
												ref={ (element) => { this.replyInner = element; } } // eslint-disable-line react/jsx-no-bind, max-len
											>
												{ errors ?
													<ErrorComponent errors={ errors } /> :
													<p className={ `${ bemClass.element('reply') }-text` }>{ data }</p> 
												}
											</div>
										</div>
										<FormSubmit
											autoComplete={ false }
											classes={ bemClass.element('submit') }
											disabled={ loading || submitted }
											// TODO: Translate text.
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
	submitted: false
};

ContactForm.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	clearHandler: React.PropTypes.func.isRequired,
	description: React.PropTypes.string.isRequired,
	email: React.PropTypes.string,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	message: React.PropTypes.string,
	name: React.PropTypes.string,
	reply: propTypes.asyncState,
	submitHandler: React.PropTypes.func.isRequired,
	submitted: React.PropTypes.bool.isRequired
};

export default BemClasses(ContactForm);