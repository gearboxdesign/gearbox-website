import React from 'react';
import BemClasses from 'components/hoc/BemClasses';

// TODO: Add aria.
function FormValidationError (props) {

	const { className, message } = props;

	return (
		<span className={ className }>
			{ message }
		</span>
	);
}

FormValidationError.defaultProps = {
	className: 'c-form__validation-error'
};

FormValidationError.propTypes = {
	className: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired
};

export default BemClasses(FormValidationError);

