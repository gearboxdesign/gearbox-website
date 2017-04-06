import React from 'react';
import { curry } from 'lodash';
import FormValidationError from 'libComponents/Form/FormValidationError';

const LABEL_CLASS = 'c-form__label',
	UI_CLASS = 'c-form__ui';

export default function (Component, opts = {}) {

	function FormComponent (props) {

		const {
			changeHandler, // eslint-disable-line no-unused-vars
			showValidation,
			valid,
			validationMessage,
			...componentProps
		} = props;

		// TODO: Pass classes prop through as an array concatenation if classes prop already exists (investigate).
		return (
			<Component
				changeHandler={ curry(processChangeHandler)(props) }
				classes={ valid ? 'is-valid' : 'is-invalid' }
				labelClassName={ LABEL_CLASS }
				uiClassName={ UI_CLASS }
				validationError={ showValidation && !valid &&
					<FormValidationError message={ validationMessage } />
				}
				{ ...componentProps }
			/>
		);
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

	// TODO: Reconsider extended use of destructuring to be clearer.
	function processChangeHandler ({ changeHandler, id, validators }, { target }) {

		const { value } = target,
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
