import React from 'react';
import { get } from 'lodash';
import bem from 'modules/bem';
import FormValidationError from 'components/lib/Form/FormValidationError';

const LABEL_CLASS = 'c-form__group-label',
	VALID_CLASS = 'is-valid',
	INVALID_CLASS = 'is-invalid';

export default function (Component) {

	function FormGroup (props) {

		const {
			changeHandler,
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

		function processChangeHandler (args) {

			const processedArgs = Object.assign({}, args, {
				validators: props.validators
			});

			changeHandler(processedArgs);
		}

		/* eslint-disable no-undefined */
		return (
			<Component
				changeHandler={ processChangeHandler }
				id={ id }
				labelClassName={ required ? labelBemClass.modifiers('required') : labelBemClass.base() }
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

	FormGroup.propTypes = {
		changeHandler: React.PropTypes.func.isRequired,
		className: React.PropTypes.string.isRequired,
		id: React.PropTypes.string.isRequired,
		showValidation: React.PropTypes.bool,
		valid: React.PropTypes.bool,
		validationMessage: React.PropTypes.string,
		validators: React.PropTypes.array,
		value: React.PropTypes.any
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	FormGroup.displayName = `formGroup(${ componentName })`;

	FormGroup.wrappedComponent = Component;

	return FormGroup;
}