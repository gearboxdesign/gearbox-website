import React from 'react';
import { get, isString, kebabCase } from 'lodash';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import FormComponent from 'components/lib/Form/FormComponent';

function FormSelect (props) {

	const {
		className,
		defaultOption,
		disabled,
		disabledClassName,
		errorId,
		label,
		labelClassName,
		id,
		options,
		required,
		value,
		validationClassName,
		validationError,
		changeHandler
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
			<select
				disabled={ disabled }
				id={ id }
				name={ id }
				onChange={ changeHandler }
				required={ required }
				value={ value }
				{ ...errorProps }
			>
				{ getOptions(options, defaultOption) }
			</select>
			{ validationError }
		</div>
	);
}

function getOption (option) {

	let value,
		text;

	if (isString(option)) {
		value = option;
	}
	else {
		text = option.text;
		value = option.value;
	}

	return (
		<option
			key={ kebabCase(value) }
			value={ value }
		>
			{ text || value }
		</option>
	);
}

function getOptions (options, defaultOption) {

	const optionItems = options.map(getOption);

	if (defaultOption) {

		return [
			<option
				key="default"
				value=""
			>
				{ defaultOption }
			</option>
		].concat(optionItems);
	}

	return optionItems;
}

FormSelect.defaultProps = {
	className: 'c-form__select'
};

FormSelect.propTypes = {
	changeHandler: React.PropTypes.func,
	className: React.PropTypes.string.isRequired,
	defaultOption: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	disabledClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	errorId: React.PropTypes.string,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
		React.PropTypes.shape({
			text: React.PropTypes.string,
			value: React.PropTypes.string
		}),
		React.PropTypes.string
	])).isRequired,
	required: React.PropTypes.bool.isRequired,
	validationClassName: React.PropTypes.string,
	validationError: React.PropTypes.element,
	value: React.PropTypes.string
};

export default BemClasses(FormComponent(FormSelect), {
	baseClass: get(FormSelect, 'defaultProps.className')
});
