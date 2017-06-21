'use strict';

const gutil = require('gulp-util'),
	plumber = require('gulp-plumber');

module.exports = function errorHandler (label) {

	return plumber({
		errorHandler: onError(label)
	});
};

function onError (label) {

	return (err) => {

		gutil.beep();
		gutil.log(gutil.colors.red(label, err));

		this.emit('end');
	};
}
