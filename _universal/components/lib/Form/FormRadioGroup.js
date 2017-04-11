import React from 'react';
import { get, kebabCase, trim } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import FormGroup from 'components/lib/Form/FormGroup';
import FormRadio from 'components/lib/Form/FormRadio';

function FormRadioGroup (props) {

	const {
		className,
		label,
		labelClassName,
		id,
		value,
		radios,
		validationClassName,
		validationError,
		changeHandler
	} = props;

	function renderRadios () {

		return radios.map((radioProps) => {

			const { disabled, label: radioLabel, value: radioValue } = radioProps;

			return (
				<FormRadio
					changeHandler={ changeHandler }
					disabled={ disabled }
					id={ id }
					key={ kebabCase(`${ id }-${ radioValue }`) }
					label={ radioLabel }
					radioValue={ radioValue }
					value={ value }
				/>
			);
		});
	}

	return (
		<div
			aria-labelledby={ id }
			className={ trim(`${ className } ${ validationClassName || '' }`) }
			role="radiogroup"
		>
			<span
				className={ labelClassName }
				id={ id }
			>
				{ label }
			</span>
			{ renderRadios(id) }
			{ validationError }
		</div>
	);
}

FormRadioGroup.defaultProps = {
	className: 'c-form__radio-group'
};

FormRadioGroup.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	radios: React.PropTypes.arrayOf(React.PropTypes.shape({
		disabled: React.PropTypes.bool,
		label: React.PropTypes.string.isRequired,
		value: React.PropTypes.oneOfType([
			React.PropTypes.bool,
			React.PropTypes.string
		]).isRequired
	})).isRequired,
	validationClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	validationError: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.element
	]),
	value: React.PropTypes.any.isRequired
};

export default BemClasses(FormGroup(FormRadioGroup), {
	baseClass: get(FormRadioGroup, 'defaultProps.className')
});