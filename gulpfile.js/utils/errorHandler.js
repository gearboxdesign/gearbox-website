'use strict';

const gutil = require('gulp-util'),
	plumber = require('gulp-plumber');

module.exports = function (label) {

	return plumber({
		errorHandler: onError(label)
	});
};

function onError (label) {

	return function (err) {

		gutil.beep();
		gutil.log(label, err);

		this.emit('end');
	};
}
