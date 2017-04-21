import React from 'react'; // eslint-disable-line no-unused-vars
import { get, pick } from 'lodash';
import { CONTACT } from 'constants/apiUrls';
import ContactForm from 'components/base/ContactForm';
import { sendJSON } from 'modules/fetchJSON';

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
		this.setFormResponse = this.setFormResponse.bind(this);
		this.setFormError = this.setFormError.bind(this);
	}

	sendForm () {

		this.setState({ response: { _loading: true } });

		return sendJSON(CONTACT, { body: JSON.stringify(
			pick(this.state, [
				'email',
				'name',
				'message'
			]))
		})
		.then(this.setFormResponse)
		.catch(this.setFormError);
	}

	clearHandler () {

		const { response } = this.state;

		// NOTE: Only return to initial state if no error was previously reported.
		this.setState(get(response, 'errors') ? { submitted: false } : INITIAL_STATE);
	}

	submitHandler (fields) {

		this.setState(fields, this.sendForm);
	}

	setFormResponse (res) {

		const { text } = res;

		this.setState({
			response: {
				data: text,
				_loading: false
			},
			submitted: true
		});
	}

	setFormError (err) {

		const { errors } = err;

		this.setState({
			response: {
				errors,
				_loading: false
			},
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