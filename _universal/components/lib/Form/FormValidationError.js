import React from 'react';
import propTypes from 'components/lib/propTypes'
import BemClasses from 'components/hoc/BemClasses';

function FormValidationError (props) {

	const { className, id, message } = props;

	return (
		<span
			className={ className }
			id={ id }
			role="alert"
		>
			{ message }
		</span>
	);
}

FormValidationError.defaultProps = {
	className: 'c-form__validation-error'
};

FormValidationError.propTypes = {
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired
};

export default BemClasses(FormValidationError);

