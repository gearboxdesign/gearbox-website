import React from 'react'; // eslint-disable-line no-unused-vars
import ContactForm from 'components/base/ContactForm';

const SHOW_MESSAGE_DURATION = 3000;

export default class ContactFormContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			email: '',
			name: '',
			message: '',
			pending: false,
			sent: false
		};

		this.submitHandler = this.submitHandler.bind(this);
	}

	submitHandler (fields) {

		// TEMP: This will be replaced with a call to fetcher.postJSON.
		this.setState(Object.assign({
			pending: true,
			sent: false
		}, fields), () => {

			setTimeout(this.setState.bind(this, {
				pending: false,
				sent: true
			}, () => {

				setTimeout(this.setState.bind(this, {
					email: '',
					name: '',
					message: '',
					sent: false
				}), SHOW_MESSAGE_DURATION);

			}), 250);
		});
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