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

const SUBMITTED_CLASS = 'is-sent';

class ContactForm extends React.PureComponent {

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
			submitHandler,
			sent
		} = this.props,
			ariaAttrs = getAriaAttrs(aria),
			messageBemClass = bem(bemClass.element('message')),
			replyBemClass = bem(bemClass.element('reply'));

		return (
			<div
				className={ trim(`${ className } ${ sent ? SUBMITTED_CLASS : '' }`) }
				{ ...ariaAttrs }
			>
				<Form
					action="POST"
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
									<div className={ bem(bemClass.element('content')).modifiers('mirrored') }>
										<div
											className={ sent ?
												messageBemClass.modifiers('sent') :
												messageBemClass.base()
											}
											// TODO: Replace arbitrary 100px with actual height.
											style={ {
												transform: sent ? 'translateY(-100px)' : 'none'
											} }
										>
											<FormTextArea
												classes={ `${ messageBemClass.base() }-inner` }
												id="message"
												label="Message"
												ref={ (element) => { this.message = element; } } // eslint-disable-line react/jsx-no-bind, max-len
												rows={ 6 }
												validators={ ['required'] }
												value={ message }
											/>
										</div>
										<div
											aria-hidden={ !sent }
											className={ sent ?
												replyBemClass.modifiers('sent') :
												replyBemClass.base()
											}
										>
											<p className={ `${ replyBemClass.base() }-inner` }>Thanks!</p>
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
	submitHandler: React.PropTypes.func.isRequired,
	sent: React.PropTypes.bool.isRequired
};

export default BemClasses(ContactForm);