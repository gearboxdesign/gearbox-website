import React from 'react';
import BemClasses from 'components/hoc/BemClasses';

// TODO: Add aria.
function FormSubmit (props) {

	const { className } = props;

	return (
		<input
			className={ className }
			type="submit"
		/>
	);
}

FormSubmit.defaultProps = {
	className: 'c-form__submit'
};

FormSubmit.propTypes = {
	className: React.PropTypes.string.isRequired
};

export default BemClasses(FormSubmit);
