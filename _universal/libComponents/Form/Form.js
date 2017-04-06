import React from 'react';
import { get } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import FormSubmit from 'libComponents/Form/FormSubmit';
import validate from 'modules/validate';

// TODO: Add aria.
class Form extends React.PureComponent {

	constructor (props) {

		super(props);

		const fields = this.getFields(this.getFormElements(props.children));

		this.submitHandler = this.submitHandler.bind(this);

		this.state = {
			fields,
			showValidation: false,
			valid: this.getValidState(fields)
		};
	}

	mapChildren (children) {

		const { showValidation, fields } = this.state;

		return React.Children.map(children, (child) => {

			if (child.props) {

				const { children: elementChildren, id } = child.props;

				const childName = get(child, 'type.wrappedComponent.name') || get(child, 'type.name');

				if (childName === 'FormComponent' || childName === 'FormGroup') {

					const field = fields[id];
					const { valid, value, validationMessage } = field;

					return React.cloneElement(child, Object.assign({}, {
						value,
						changeHandler: this.updateField.bind(this)
					}, field.hasOwnProperty('valid') && {
						showValidation,
						valid,
						validationMessage
					}));
				}
				else if (elementChildren) {

					/**
					 * NOTE: Recursion required to pass through containing components such as fieldset wrappers.
					 */
					return React.cloneElement(child, {
						children: this.mapChildren(elementChildren)
					});
				}
			}

			return child;
		});
	}

	updateField ({ id, value, validators, checked }) {

		const field = this.state.fields[id],
			stateValue = field.value,
			updatedValue = this.updateValue(stateValue, value, checked),
			updatedValidation = this.validateField(updatedValue, validators);

		const fieldsUpdate = Object.assign({}, this.state.fields, {
			[id]: Object.assign({}, field, {
				value: updatedValue
			}, updatedValidation)
		});

		this.setState(Object.assign({}, this.state, {
			fields: Object.assign({}, this.state.fields, fieldsUpdate),
			valid: this.getValidState(fieldsUpdate)
		}));
	}

	updateValue (stateValue, value, checked) {

		if (Array.isArray(stateValue)) {

			if (typeof checked === 'boolean') {

				if (checked === true) {

					return stateValue.includes(value) ?
						stateValue :
						stateValue.concat(value);
				}
				else if (checked === false) {

					return stateValue.includes(value) ?
						stateValue.filter((item) => { return item !== value; }) :
						stateValue;
				}
			}

			return stateValue;
		}
		else if (typeof stateValue === 'boolean') {

			if (typeof checked === 'boolean') {
				return checked;
			}

			return value === 'true';
		}

		return value;
	}

	validateField (value, validators) {

		return validators && validate(value, validators);
	}

	submitHandler (evt) {

		evt.preventDefault();

		if (this.state.valid) {
			this.props.submitHandler(this.getFieldValues(this.state.fields));
		}
		else {
			this.setState({ showValidation: true });
		}
	}

	getFields (formComponents) {

		return formComponents.reduce((fields, component) => {

			const { id, value, checks, validators } = component.props;
			const defaultValue = checks ?
				Array.isArray(value) ?
					value : [] : value;

			return Object.assign({}, fields, {
				[id]: Object.assign({}, { value: defaultValue }, this.validateField(value, validators))
			});

		}, {});
	}

	getFormElements (children) {

		return React.Children.toArray(children).reduce((arr, child) => {

			if (child.props) {

				const { children: elementChildren } = child.props;

				const childName = get(child, 'type.wrappedComponent.name') || get(child, 'type.name');

				if (childName === 'FormComponent' || childName === 'FormGroup') {
					return arr.concat(child);
				}
				else if (elementChildren) {
					return arr.concat(this.getFormElements(elementChildren));
				}
			}

			return arr;

		}, []);
	}

	getValidState (fields) {

		return !Object.values(fields)
			.map((field) => {
				return field.valid;
			})
			.includes(false);
	}

	getFieldValues (fields) {

		return Object.keys(fields).reduce((values, key) => {

			return Object.assign({}, values, {
				[key]: fields[key].value
			});

		}, {});
	}

	renderChildren () {

		return this.mapChildren(this.props.children);
	}

	render () {

		const { showValidation, valid } = this.state;
		const { className,
			submitLabel
		} = this.props;

		return (
			<form
				className={ className }
				onSubmit={ this.submitHandler }
			>
				{ this.renderChildren() }
				<div>
					<FormSubmit
						disabled={ showValidation && !valid }
						value={ submitLabel }
					/>
				</div>
			</form>
		);
	}
}

Form.defaultProps = {
	className: 'c-form'
};

Form.propTypes = {
	children: React.PropTypes.any,
	className: React.PropTypes.string.isRequired,
	submitHandler: React.PropTypes.func.isRequired,
	submitLabel: React.PropTypes.string
};

export default BemClasses(Form);
