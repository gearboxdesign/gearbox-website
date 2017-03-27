'use strict';

require('babel-core/register');

require('../config/appPaths');
require('dotenv').config({ silent: true });
require('app-module-path').addPath(__dirname);

const { partial } = require('lodash'),
	_ = require('lodash'),
	requireDir = require('require-dir');

const taskDirs = [
	'tasks',
	'compoundTasks'
];

taskDirs.forEach(partial(requireDir, _, { recurse: true }));