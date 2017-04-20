import React from 'react';
import { get, kebabCase } from 'lodash';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'components/lib/Form/FormComponent';

function FormCheck (props) {

	const {
		className,
		checkValue,
		disabled,
		disabledClassName,
		errorId,
		label,
		labelClassName,
		id,
		required,
		value,
		validationClassName,
		validationError,
		changeHandler
	} = props,
		errorProps = Object.assign({}, errorId && { 'aria-describedby': errorId }),
		inputId = kebabCase(`${ id }-${ checkValue }`);

	return (
		<div className={ combineClasses(className, validationClassName || disabledClassName).join(' ') }>
			<input
				checked={ Array.isArray(value) ?
					value.includes(checkValue) :
					typeof value === 'boolean' ?
					value === checkValue :
					false }
				disabled={ disabled }
				id={ inputId }
				name={ id }
				onChange={ changeHandler }
				required={ required }
				type="checkbox"
				value={ String(checkValue) }
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

FormCheck.defaultProps = {
	checkValue: true,
	className: 'c-form__check',
	disabled: false,
	required: false,
	value: false
};

FormCheck.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	checkValue: (props, propName, componentName) => {

		const { value, checkValue } = props,
			errorPrefix = `Invalid prop '${ propName }' (${ value }) supplied to ${ componentName }`;

		if (typeof value === 'boolean' && typeof checkValue !== 'boolean') {
			throw new Error(`${ errorPrefix }, value prop (${ value }) is of type Boolean, and so checkValue prop (${ checkValue }) must also be of type Boolean.`); // eslint-disable-line max-len
		}
		else if (Array.isArray(value) && typeof checkValue !== 'string') {
			throw new Error(`${ errorPrefix }, value prop (${ value }) is an Array, and so checkValue prop (${ checkValue }) must be of type String.`); // eslint-disable-line max-len
		}
	},
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
	required: React.PropTypes.bool.isRequired,
	validationClassName: React.PropTypes.string,
	validationError: React.PropTypes.element,
	value: React.PropTypes.oneOfType([
		React.PropTypes.array,
		React.PropTypes.bool
	])
};

export default BemClasses(FormComponent(FormCheck), {
	baseClass: get(FormCheck, 'defaultProps.className')
});
