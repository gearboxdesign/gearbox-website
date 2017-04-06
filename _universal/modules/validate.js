import validator from 'validator';
import { VALIDATION_MESSAGES } from 'constants/validation';

export default function validate (value, validators = []) {

	let valid = true,
		validationMessage = null;

	const validatorMethods = Array.isArray(validators) ? validators : [validators];

	/**
	 * NOTE: A validation rule can take the form of:
	 * 	- A Function which expects a 'value' argument and must return a Boolean.
	 * 	- An Object which has:
	 * 		- A 'method' property, either a String or Function.
	 * 		- An optional 'message' property to display if validation has failed.
	 * 	- A String which should equal 'require' or one of the rules detailed here: https://github.com/chriso/validator.js.
	 */
	for (const rule of validatorMethods) {

		const testRule = rule.method || rule;
		let testFunc;

		if (typeof testRule === 'function') {
			testFunc = testRule;
		}
		else {
			testFunc = (testRule === 'required') ? required : validator[testRule];
		}

		if (testFunc && typeof testFunc === 'function') {
			valid = testFunc(value);

			if (!valid) {
				validationMessage = rule.message || VALIDATION_MESSAGES[testRule] || 'Invalid';
				break;
			}
		}
		else {
			throw new Error(`"${ rule }" is not a recognised validator rule.`);
		}
	}

	return {
		validationMessage,
		valid
	};
}

function required (value) {

	if (Array.isArray(value)) {
		return Boolean(value.length);
	}

	return Boolean(value);
}
