'use strict';

const path = require('path'),
	paths = require('../../config/paths');

const prod = process.env.NODE_ENV === 'production';

/* eslint-disable indent */
module.exports = {
	cache: true,
    devFile: false,
	dest: path.join(paths.scripts.out, 'modernizr-custom.js'),
    options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
    ],
    uglify: prod,
    tests: [],
    excludeTests: [],
    crawl: true,
    useBuffers: false,
    files: {
        src: [
            path.join(paths.scripts.src, '**', '*.js'),
            path.join(paths.styles.main, '**', '*.scss'),
            path.join(paths.universal, '**', '*.js'),
			path.join(paths.universal, '**', '*.scss')
		]
    },
    customTests: []
};

/* eslint-enable */
