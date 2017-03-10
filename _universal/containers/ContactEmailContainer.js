import React from 'react'; // eslint-disable-line no-unused-vars
import ContactEmail from 'components/ContactEmail';

function ContactEmailContainer (props) {

	return (
		<ContactEmail { ...props } />
	);
}

ContactEmailContainer.defaultProps = {};

ContactEmailContainer.propTypes = {};