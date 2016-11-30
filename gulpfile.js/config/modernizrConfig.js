'use strict';

const pathJoin = require('utils/pathJoin'),
	paths = require('config/paths');

const dev = process.env.NODE_ENV === 'development';

/* eslint-disable indent */
module.exports = {
	cache: true,
    devFile: false,
	dest: pathJoin(paths.scripts.out, 'modernizr-custom.js'),
    options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
    ],
    uglify: !dev,
    tests: [],
    excludeTests: [],
    crawl: true,
    useBuffers: false,
    files: {
        src: [
			pathJoin(paths.scripts.src, '**', '*.js'),
			pathJoin(paths.styles.main, '**', '*.scss')
		]
    },
    customTests: []
};

/* eslint-enable */
