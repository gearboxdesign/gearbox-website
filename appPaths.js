'use strict';

const path = require('path'),
	paths = require('./config/paths');

const basePath = path.join(__dirname, '..');

// NOTE: Adds require/import path shortcuts.
const appPaths = [
	path.resolve(basePath),
	path.resolve(basePath, paths.scripts.src),
	path.resolve(basePath, paths.scripts.lib),
	path.resolve(basePath, paths.server),
	path.resolve(basePath, paths.universal)
];

appPaths.forEach(require('app-module-path').addPath);

module.exports = appPaths;
