import React from 'react'; // eslint-disable-line no-unused-vars
import { CONTACT } from 'constants/apiUrls';
import ContactForm from 'components/base/ContactForm';
import { sendJSON } from 'modules/fetchJSON';

const SHOW_MESSAGE_DURATION = 3000,
	INITIAL_FORM_STATE = Object.freeze({
		email: '',
		name: '',
		message: '',
		pending: false,
		reply: null
	});

export default class ContactFormContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = Object.assign({}, INITIAL_FORM_STATE);

		this.submitHandler = this.submitHandler.bind(this);
		this.sendForm = this.sendForm.bind(this);
	}

	sendForm () {

		// TODO: Condense this.
		return sendJSON(CONTACT)
			.then(({ responseText }) => {

				this.setState({
					pending: false,
					reply: responseText
				}, () => {
					setTimeout(this.setState.bind(this, INITIAL_FORM_STATE), SHOW_MESSAGE_DURATION);
				});
			})
			.catch(({ errors }) => {

				this.setState({
					pending: false,
					reply: errors.toString()
				}, () => {
					setTimeout(this.setState.bind(this, { reply: null }), SHOW_MESSAGE_DURATION);
				});
			});
	}

	submitHandler (fields) {

		this.setState(Object.assign({ pending: true }, fields), this.sendForm);
	}

	render () {

		return (
			<ContactForm
				submitHandler={ this.submitHandler }
				{ ...Object.assign({}, this.state, this.props) }
			/>
		);
	}
}

ContactFormContainer.defaultProps = {};

ContactFormContainer.propTypes = {};