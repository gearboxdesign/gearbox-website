import React from 'react';
import { get, kebabCase } from 'lodash';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'components/lib/Form/FormComponent';

function FormRadio (props) {

	const {
		changeHandler,
		className,
		disabled,
		disabledClassName,
		errorId,
		label,
		labelClassName,
		id,
		radioValue,
		required,
		value,
		validationClassName,
		validationError
	} = props,
		errorProps = Object.assign({}, errorId && { 'aria-describedby': errorId }),
		inputId = kebabCase(`${ id }-${ radioValue }`);

	return (
		<div className={ combineClasses(className, validationClassName || disabledClassName).join(' ') }>
			<input
				checked={ value === radioValue }
				disabled={ disabled }
				id={ inputId }
				name={ id }
				onChange={ changeHandler }
				required={ required }
				type="radio"
				value={ String(radioValue) }
				{ ...errorProps }
			/>
			<label
				className={ labelClassName }
				htmlFor={ inputId }
			>
				{ label }
			</label>
			{ validationError }
		</div>
	);
}

FormRadio.defaultProps = {
	className: 'c-form__radio',
	disabled: false,
	required: false
};

FormRadio.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	className: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool.isRequired,
	disabledClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	errorId: React.PropTypes.string,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	radioValue: (props, propName, componentName) => {

		const { value, radioValue } = props,
			errorPrefix = `Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }`; 

		if (typeof value === 'boolean' && typeof radioValue !== 'boolean') {
			throw new Error(`${ errorPrefix }, value prop (${ value }) is of type Boolean, and so radioValue prop (${ radioValue }) must also be of type Boolean.`); // eslint-disable-line max-len
		}
		else if (typeof value === 'string' && typeof radioValue !== 'string') {
			throw new Error(`${ errorPrefix }, value prop (${ value }) is of type String, and so radioValue prop (${ radioValue }) must also be of type String.`); // eslint-disable-line max-len
		}
	},
	required: React.PropTypes.bool.isRequired,
	validationClassName: React.PropTypes.string,
	validationError: React.PropTypes.element,
	value: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	])
};

export default BemClasses(FormComponent(FormRadio), {
	baseClass: get(FormRadio, 'defaultProps.className')
});
