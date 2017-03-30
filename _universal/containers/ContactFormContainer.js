import React from 'react'; // eslint-disable-line no-unused-vars
import ContactForm from 'components/ContactForm';

export default function ContactFormContainer (props) {

	return (
		<ContactForm { ...props } />
	);
}

ContactFormContainer.defaultProps = {};

ContactFormContainer.propTypes = {};