'use strict';

const pathJoin = require('../utils/pathJoin');

const CLIENT_DIR = '_client',
	SERVER_DIR = '_server',
	UNIVERSAL_DIR = '_universal',
	REPORTS_DIR = 'reports',
	RESOURCES_DIR = 'public',
	CLIENT_FONTS_DIR = pathJoin(CLIENT_DIR, 'fonts'),
	CLIENT_SCRIPTS_DIR = pathJoin(CLIENT_DIR, 'scripts'),
	CLIENT_STYLES_DIR = pathJoin(CLIENT_DIR, 'styles'),
	CLIENT_IMAGES_DIR = pathJoin(CLIENT_DIR, 'images');

module.exports = {
	client: CLIENT_DIR,
	reports: REPORTS_DIR,
	resources: RESOURCES_DIR,
	server: SERVER_DIR,
	universal: UNIVERSAL_DIR,
	scripts: {
		main: CLIENT_SCRIPTS_DIR,
		lib: pathJoin(CLIENT_SCRIPTS_DIR, 'lib'),
		src: pathJoin(CLIENT_SCRIPTS_DIR, 'src'),
		out: pathJoin(RESOURCES_DIR, 'js')
	},
	styles: {
		main: CLIENT_STYLES_DIR,
		out: pathJoin(RESOURCES_DIR, 'css')
	},
	images: {
		main: CLIENT_IMAGES_DIR,
		icons: pathJoin(CLIENT_IMAGES_DIR, 'icons'),
		out: pathJoin(RESOURCES_DIR, 'img')
	},
	fonts: {
		main: CLIENT_FONTS_DIR,
		out: pathJoin(RESOURCES_DIR, 'fonts')
	}
};
