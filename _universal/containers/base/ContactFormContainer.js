import React from 'react';
import { get, pick } from 'lodash';
import { CONTACT } from 'constants/apiUrls';
import ContactForm from 'components/base/ContactForm';
import { sendJSON } from 'modules/fetchJSON';
import getAsyncState from 'modules/getAsyncState';

const INITIAL_STATE = Object.freeze({
	email: '',
	name: '',
	message: '',
	submitted: false
});

export default class ContactFormContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = Object.assign({}, INITIAL_STATE);

		this.clearHandler = this.clearHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.sendForm = this.sendForm.bind(this);
		this.setReply = this.setReply.bind(this);
		this.setError = this.setError.bind(this);
	}

	sendForm () {

		const { lang } = this.context;

		this.setState({ reply: getAsyncState({ loading: true }) });

		return sendJSON(CONTACT, {
			body: JSON.stringify(
				Object.assign({
					lang
				},
				pick(this.state, [
					'email',
					'name',
					'message'
				]))
			)
		})
		.then(this.setReply)
		.catch(this.setError);
	}

	clearHandler () {

		const { reply } = this.state;

		// NOTE: Only return to initial state if no error was previously reported.
		this.setState(get(reply, 'errors') ? { submitted: false } : INITIAL_STATE);
	}

	submitHandler (fields) {

		this.setState(fields, this.sendForm);
	}

	setReply (res) {

		const { text } = res;

		this.setState({
			reply: getAsyncState({
				loading: false,
				data: text
			}),
			submitted: true
		});
	}

	setError (err) {

		const { errors } = err;

		this.setState({
			reply: getAsyncState({
				errors,
				loading: false
			}),
			submitted: true
		});
	}

	render () {

		return (
			<ContactForm
				clearHandler={ this.clearHandler }
				submitHandler={ this.submitHandler }
				{ ...Object.assign({}, this.state, this.props) }
			/>
		);
	}
}

ContactFormContainer.defaultProps = {};

ContactFormContainer.propTypes = {};

ContactFormContainer.contextTypes = {
	lang: React.PropTypes.string
};