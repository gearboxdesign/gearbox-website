import React from 'react';
import { get, kebabCase, trim } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import FormGroup from 'components/lib/Form/FormGroup';
import FormCheck from 'components/lib/Form/FormCheck';

function FormCheckGroup (props) {

	const {
		className,
		label,
		labelClassName,
		id,
		value,
		checks,
		validationClassName,
		validationError,
		changeHandler
	} = props;

	function renderChecks () {

		return checks.map((checkProps) => {

			const { disabled, label: checkLabel, value: checkValue } = checkProps;

			return (
				<FormCheck
					changeHandler={ changeHandler }
					checkValue={ checkValue }
					disabled={ disabled }
					id={ id }
					key={ kebabCase(`${ id }-${ checkValue }`) }
					label={ checkLabel }
					value={ value }
				/>
			);
		});
	}

	return (
		<div
			aria-labelledby={ id }
			className={ trim(`${ className } ${ validationClassName || '' }`) }
		>
			<span
				className={ labelClassName }
				id={ id }
			>
				{ label }
			</span>
			{ renderChecks() }
			{ validationError }
		</div>
	);
}

FormCheckGroup.defaultProps = {
	className: 'c-form__check-group'
};

FormCheckGroup.propTypes = {
	changeHandler: React.PropTypes.func.isRequired,
	checks: React.PropTypes.arrayOf(React.PropTypes.shape({
		disabled: React.PropTypes.bool,
		label: React.PropTypes.string.isRequired,
		value: React.PropTypes.string.isRequired
	})).isRequired,
	className: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	labelClassName: React.PropTypes.string.isRequired,
	validationClassName: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.string
	]),
	validationError: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.element
	]),
	value: React.PropTypes.array.isRequired
};

export default BemClasses(FormGroup(FormCheckGroup), {
	baseClass: get(FormCheckGroup, 'defaultProps.className')
});