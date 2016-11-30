'use strict';

const gulp = require('gulp'),
	browserSync = require('browser-sync');

function browserSyncTask (done) {

	browserSync.init({
		proxy: `localhost:${ process.env.PORT }`
	}, done);
}

gulp.task('browserSync', browserSyncTask);

module.exports = {
	task: browserSyncTask
};
