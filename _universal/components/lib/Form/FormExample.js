import React from 'react';
import Form from 'components/lib/Form/Form';
import FormCheck from 'components/lib/Form/FormCheck';
import FormCheckGroup from 'components/lib/Form/FormCheckGroup';
import FormInput from 'components/lib/Form/FormInput';
import FormSelect from 'components/lib/Form/FormSelect';
import FormTextArea from 'components/lib/Form/FormTextArea';
import FormRadio from 'components/lib/Form/FormRadio';
import FormRadioGroup from 'components/lib/Form/FormRadioGroup';
import FormSubmit from 'components/lib/Form/FormSubmit';

const checkArr = [],
	checkGroupArr = [];

let radioBool = false,
	radioVal;

export default function FormExample (props) {

	return (
		<Form
			action="#"
			method="POST"
			submitHandler={ (...args) => { console.log(args); } }
			submitLabel={ 'Submit' }
		>
			<fieldset>
				<legend>Form Example</legend>

				<h2>Inputs</h2>
				<FormInput
					id="text"
					label="Text"
					placeholder="Enter Text"
					validators={ ['required'] }
					value="text"
				/>
				<FormInput
					id="email"
					label="Email"
					placeholder="Enter Email"
					validators={ ['required', 'isEmail'] }
					value="test@test.com"
				/>
				<FormInput
					disabled={ true }
					id="text-disabled"
					label="Text (Disabled)"
					value="disabled"
				/>
				<FormInput
					id="number"
					label="Number"
					placeholder="Enter Number"
					type="number"
					validators={ ['required'] }
					value="0"
				/>

				<h2>Checkboxes</h2>
				<FormCheck
					id="check-bool"
					label="Check Boolean"
					validators={ ['required'] }
					value={ false }
				/>
				<FormCheck
					disabled={ true }
					id="check-bool-disabled"
					label="Check Boolean (Disabled)"
					value={ false }
				/>
				<FormCheck
					checkValue="A"
					id="check-arr"
					label="Check Array - A"
					value={ checkArr }
				/>
				<FormCheck
					checkValue="B"
					id="check-arr"
					label="Check Array - B"
					value={ checkArr }
				/>
				<FormCheck
					checkValue="C"
					disabled={ true }
					id="check-arr"
					label="Check Array - C - Disabled"
					value={ checkArr }
				/>
				<FormCheckGroup
					checks={ [{
						label: 'Check Group - A',
						value: 'A'
					},
					{
						label: 'Check Group - B',
						value: 'B'
					},
					{
						disabled: true,
						label: 'Check Group - C (Disabled)',
						value: 'C'
					}] }
					id="check-group"
					label="Check Group"
					validators={ ['required'] }
					value={ checkGroupArr }
				/>

				<h2>Radios</h2>
				<FormRadio
					id="radio-bool"
					label="Radio Boolean - true"
					radioValue={ true }
					value={ radioBool }
				/>
				<FormRadio
					id="radio-bool"
					label="Radio Boolean - false"
					radioValue={ false }
					value={ radioBool }
				/>
				<FormRadio
					id="radio-val"
					label="Radio Val - A"
					radioValue="A"
					value={ radioVal }
				/>
				<FormRadio
					id="radio-val"
					label="Radio Val - B"
					radioValue="B"
					value={ radioVal }
				/>
				<FormRadio
					disabled={ true }
					id="radio-val"
					label="Radio Val - C (Disabled)"
					radioValue="C"
					value={ radioVal }
				/>
				<FormRadioGroup
					id="radio-group"
					label="Radio Group"
					radios={ [{
						label: 'Yes',
						value: 'yes'
					},
					{
						label: 'No',
						value: 'no'
					},
					{
						disabled: true,
						label: 'Maybe',
						value: 'maybe'
					}] }
					validators={ [{
						fn: (value) => { return value === 'yes'; },
						message: "You're answer must be yes!"
					}] }
					value="yes"
				/>
				<FormRadioGroup
					id="radio-group-boolean"
					label="Radio Group - Boolean"
					radios={ [{
						label: 'True',
						value: true
					},
					{
						label: 'False',
						value: false
					}] }
					validators={ ['required'] }
					value={ false }
				/>

				<h2>Select</h2>
				<FormSelect
					defaultOption="Select"
					id="select"
					label="Select"
					options={ ['Option 1', 'Option 2'] }
					validators={ ['required'] }
				/>
				<FormSelect
					defaultOption="Select"
					disabled={ true }
					id="select-disabled"
					label="Select (Disabled)"
					options={ ['Option 1', 'Option 2'] }
				/>

				<h2>Textarea</h2>
				<FormTextArea
					id="textarea"
					label="Textarea"
					validators={ ['required'] }
				/>
				<FormTextArea
					disabled={ true }
					id="textarea-disabled"
					label="Textarea (Disabled)"
				/>
				<FormSubmit />
			</fieldset>
		</Form>
	);
}