import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'libComponents/Form/FormComponent';
import bem from 'modules/bem';

// TODO: Add aria.
function FormInput (props) {

	const {
		className,
		disabled,
		label,
		labelClassName,
		id,
		type,
		uiClassName,
		value,
		validationError,
		changeHandler
	} = props;

	return (
		<div className={ className }>
			<label
				className={ labelClassName }
				htmlFor={ id }
			>
				{ label }
			</label>
			<input
				className={ bem(uiClassName).subElement('input') }
				disabled={ disabled }
				id={ id }
				name={ id }
				onChange={ changeHandler }
				type={ type }
				value={ value }
			/>
			{ validationError }
		</div>
	);
}

FormInput.defaultProps = {
	className: 'c-form__input',
	type: 'text'
};

FormInput.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	className: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	uiClassName: React.PropTypes.string.isRequired,
	validationError: React.PropTypes.any,
	value: React.PropTypes.string
};

export default BemClasses(FormComponent(FormInput));
