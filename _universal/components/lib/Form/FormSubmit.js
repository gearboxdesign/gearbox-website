import React from 'react';
import BemClasses from 'components/hoc/BemClasses';

function FormSubmit (props) {

	const { className, disabled, value } = props;

	return (
		<button
			className={ className }
			disabled={ disabled }
			type="submit"
		>
			{ value }
		</button>
	);
}

FormSubmit.defaultProps = {
	className: 'c-form__submit',
	disabled: false,
	value: 'Submit'
};

FormSubmit.propTypes = {
	className: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool.isRequired,
	value: React.PropTypes.string.isRequired
};

export default BemClasses(FormSubmit);
