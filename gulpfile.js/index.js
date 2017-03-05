'use strict';

require('babel-core/register');

require('../config/appPaths');
require('dotenv').config({ silent: true });

require('require-dir')('./tasks', { recurse: true });

const { partial } = require('lodash'),
	path = require('path');

const compoundTask = partial(path.resolve.bind(path), __dirname, './compound');

require(compoundTask('lint'));
require(compoundTask('watch'));
require(compoundTask('default'));
