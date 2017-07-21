'use strict';

const path = require('path');

const CLIENT_DIR = '_client',
	SERVER_DIR = '_server',
	UNIVERSAL_DIR = '_universal',
	REPORTS_DIR = 'reports',
	RESOURCES_DIR = 'public',
	CLIENT_FONTS_DIR = path.join(CLIENT_DIR, 'fonts'),
	CLIENT_SCRIPTS_DIR = path.join(CLIENT_DIR, 'scripts'),
	CLIENT_STYLES_DIR = path.join(CLIENT_DIR, 'styles'),
	CLIENT_IMAGES_DIR = path.join(CLIENT_DIR, 'images'),
	SERVER_TEMPLATES_DIR = path.join(SERVER_DIR, 'views');

module.exports = {
	client: CLIENT_DIR,
	reports: REPORTS_DIR,
	resources: RESOURCES_DIR,
	server: SERVER_DIR,
	universal: UNIVERSAL_DIR,
	scripts: {
		main: CLIENT_SCRIPTS_DIR,
		lib: path.join(CLIENT_SCRIPTS_DIR, 'lib'),
		src: path.join(CLIENT_SCRIPTS_DIR, 'src'),
		out: path.join(RESOURCES_DIR, 'js')
	},
	styles: {
		main: CLIENT_STYLES_DIR,
		out: path.join(RESOURCES_DIR, 'css')
	},
	images: {
		main: CLIENT_IMAGES_DIR,
		out: path.join(RESOURCES_DIR, 'img')
	},
	fonts: {
		main: CLIENT_FONTS_DIR,
		out: path.join(RESOURCES_DIR, 'fonts')
	},
	views: {
		main: SERVER_TEMPLATES_DIR,
		templates: path.join(SERVER_TEMPLATES_DIR, 'templates')
	}
};
