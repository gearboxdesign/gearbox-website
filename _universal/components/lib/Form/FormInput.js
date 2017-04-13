import React from 'react';
import { get, trim } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'components/lib/Form/FormComponent';

const TYPE_TEXT = 'text',
	TYPE_NUMBER = 'number';

function FormInput (props) {

	const {
		className,
		disabled,
		disabledClassName,
		label,
		labelClassName,
		id,
		placeholder,
		required,
		type,
		value,
		validationClassName,
		validationError,
		changeHandler
	} = props;

	return (
		<div className={ trim(`${ className } ${ validationClassName || disabledClassName || '' }`) }>
			<label
				className={ labelClassName }
				htmlFor={ id }
			>
				{ label }
			</label>
			<input
				disabled={ disabled }
				id={ id }
				name={ id }
				onChange={ changeHandler }
				placeholder={ placeholder }
				required={ required }
				type={ type }
				value={ value }
			/>
			{ validationError }
		</div>
	);
}

FormInput.defaultProps = {
	className: 'c-form__input',
	disabled: false,
	required: false,
	type: TYPE_TEXT
};

FormInput.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	className: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool.isRequired,
	disabledClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool.isRequired,
	type: React.PropTypes.oneOf([TYPE_TEXT, TYPE_NUMBER]).isRequired,
	validationClassName: React.PropTypes.string,
	validationError: React.PropTypes.element,
	value: React.PropTypes.string
};

const WrappedFormInput = BemClasses(FormComponent(FormInput), {
	baseClass: get(FormInput, 'defaultProps.className')
});

WrappedFormInput.TYPE_TEXT = TYPE_TEXT;
WrappedFormInput.TYPE_NUMBER = TYPE_NUMBER;

export default WrappedFormInput;