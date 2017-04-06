'use strict';

const path = require('path'),
	paths = require('./config/paths');

// NOTE: Adds require/import path shortcuts.
const appPaths = [
	path.resolve(__dirname),
	path.resolve(__dirname, paths.scripts.src),
	path.resolve(__dirname, paths.scripts.lib),
	path.resolve(__dirname, paths.server),
	path.resolve(__dirname, paths.universal)
];

appPaths.forEach(require('app-module-path').addPath);

module.exports = appPaths;
