'use strict';

const gutil = require('gulp-util'),
	through2 = require('through2');

module.exports = function () {

	/* eslint-disable indent */
    return through2.obj((file, encoding, done) => {
        
        gutil.log(file);
        done(null, file);
    });

	/* eslint-enable */
};
