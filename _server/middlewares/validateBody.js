'use strict';

const { get, isBoolean, isNumber, isString } = require('lodash'),
	validate = require('modules/validate').default;

module.exports = function validateBody (model) {

	return (req, res, next) => {

		const errors = Object.entries(req.body).reduce(validateFields(model), []);

		if (errors.length) {

			return res.status(400).json({
				errors
			});
		}

		return next();
	};
};

function validateFields (model) {

	return (errorArr, [key, value]) => {

		const type = get(model, `${ key }.type`),
			validators = get(model, `${ key }.validators`);

		if (!type || !validators) {
			return errorArr;
		}

		if (!validateType(type, value)) {
			return errorArr.concat(`${ key } - Type is invalid, must be of type ${ typeof type() }`);
		}

		const { valid, validationMessage } = validate(value, validators);

		return errorArr.concat(!valid ? `${ key } - ${ validationMessage }` : []);
	};
}

function validateType (type, value) {

	/* eslint-disable indent */
	switch (type) {
		case Boolean: { return isBoolean(value); }
		case Number: { return isNumber(value); }
		case String: { return isString(value); }
		default: { return false; }
	}

	/* eslint-enable */
}