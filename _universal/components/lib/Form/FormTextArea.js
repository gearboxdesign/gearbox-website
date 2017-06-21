import React from 'react';
import { get } from 'lodash';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'components/lib/Form/FormComponent';

function FormTextArea (props) {

	const {
		changeHandler,
		className,
		cols,
		disabled,
		disabledClassName,
		errorId,
		label,
		labelClassName,
		id,
		placeholder,
		required,
		rows,
		value,
		validationError,
		validationClassName
	} = props,
		errorProps = Object.assign({}, errorId && { 'aria-describedby': errorId });

	return (
		<div className={ combineClasses(className, validationClassName || disabledClassName).join(' ') }>
			<label
				className={ labelClassName }
				htmlFor={ id }
			>
				{ label }
			</label>
			<textarea
				cols={ cols }
				disabled={ disabled }
				id={ id }
				name={ id }
				onChange={ changeHandler }
				placeholder={ placeholder }
				required={ required }
				rows={ rows }
				value={ value }
				{ ...errorProps }
			/>
			{ validationError }
		</div>
	);
}

FormTextArea.defaultProps = {
	className: 'c-form__textarea',
	disabled: false,
	required: false,
	rows: 1,
	cols: 1
};

FormTextArea.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	className: React.PropTypes.string.isRequired,
	cols: React.PropTypes.number.isRequired,
	disabled: React.PropTypes.bool.isRequired,
	disabledClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	errorId: React.PropTypes.string,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool.isRequired,
	rows: React.PropTypes.number.isRequired,
	validationClassName: React.PropTypes.string,
	validationError: React.PropTypes.element,
	value: React.PropTypes.string
};

export default BemClasses(FormComponent(FormTextArea), {
	baseClass: get(FormTextArea, 'defaultProps.className')
});