'use strict';

require('babel-core/register');

require('dotenv').config({ silent: true });
require('app-module-path').addPath(__dirname);

const { _, partial } = require('lodash'),
	requireDir = require('require-dir');

const taskDirs = [
	'tasks',
	'compoundTasks'
];

taskDirs.forEach(partial(requireDir, _, { recurse: true }));