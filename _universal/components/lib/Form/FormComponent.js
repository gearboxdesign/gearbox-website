import React from 'react';
import { get, partial } from 'lodash';
import bem from 'modules/bem';
import FormValidationError from 'components/lib/Form/FormValidationError';

const LABEL_CLASS = 'c-form__label',
	VALID_CLASS = 'is-valid',
	INVALID_CLASS = 'is-invalid',
	DISABLED_CLASS = 'is-disabled';

export default function (Component) {

	function FormComponent (props) {

		const {
			changeHandler, // eslint-disable-line no-unused-vars
			id,
			showValidation,
			valid,
			validationMessage,
			...componentProps
		} = props,
			required = get(props, 'validators', []).includes('required'),
			errorId = `${ id }-error`,
			labelBemClass = bem(LABEL_CLASS),
			errorProps = Object.assign({}, (showValidation && !valid) && { errorId });

		/* eslint-disable no-undefined */
		return (
			<Component
				changeHandler={ partial(processChangeHandler, props) }
				disabledClassName={ componentProps.disabled && DISABLED_CLASS }
				id={ id }
				labelClassName={ required ? labelBemClass.modifiers('required') : labelBemClass.base() }
				required={ required }
				validationClassName={ showValidation ?
					(valid ? VALID_CLASS : INVALID_CLASS) :
					undefined
				}
				validationError={ (showValidation && !valid) ?
					<FormValidationError
						id={ errorId }
						message={ validationMessage }
					/> :
					undefined
				}
				{ ...errorProps }
				{ ...componentProps }
			/>
		);

		/* eslint-enable */
	}

	FormComponent.propTypes = {
		changeHandler: React.PropTypes.func.isRequired,
		className: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,
		showValidation: React.PropTypes.bool,
		valid: React.PropTypes.bool,
		validationMessage: React.PropTypes.string,
		validators: React.PropTypes.array
	};

	function processChangeHandler (componentProps, evt) {

		const { changeHandler, id, validators } = componentProps,
			{ target } = evt,
			{ value } = target,
			checked = target.type === 'checkbox' ? target.checked : undefined; // eslint-disable-line no-undefined

		changeHandler({
			id,
			value,
			validators,
			checked
		});
	}

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	FormComponent.displayName = `formComponent(${ componentName })`;

	FormComponent.wrappedComponent = Component;

	return FormComponent;
}
