'use strict';

require('dotenv').config({ silent: true });

const apicache = require('apicache'),
	apiRouter = require('routes/api'),
	appRouter = require('routes/app'),
	bodyParser = require('body-parser'),
	browserSync = require('browser-sync'),
	compression = require('compression'),
	cors = require('cors'),
	errorHandler = require('handlers/errorHandler'),
	express = require('express'),
	favicon = require('serve-favicon'),
	getSiteMap = require('lib/getSiteMap'),
	helmet = require('helmet'),
	holding = require('routes/holding'),
	languageDetector = require('middlewares/languageDetector'),
	logger = require('utils/logger'),
	morgan = require('morgan'),
	paths = require('config/paths'),
	path = require('path'),
	redirectSSL = require('middlewares/redirectSSL'),
	robots = require('express-robots'),
	webhooksRouter = require('routes/webhooks');

// Constants
const BASE_DIR = path.join(__dirname, '..');

const app = express(),
	debug = process.env.DEBUG,
	dev = process.env.NODE_ENV === 'development',
	maintenance = process.env.MAINTENANCE_MODE === 'true',
	sync = process.env.SYNC === 'true',
	ssl = process.env.SSL === 'true';

// App Settings
app.set('view engine', 'ejs');
app.set('views', paths.views.main);
app.set('port', process.env.PORT);

// App Wide Middlewares
app.use(morgan(dev ? 'dev' : 'combined'));
app.use(cors());
// TODO: enable & configure contentSecurityPolicy property
app.use(helmet());
app.use(compression());
app.use(robots({
	UserAgent: '*',
	Disallow: dev ? '/' : ['/api', '/webhooks']
}));
app.use(favicon(path.join(BASE_DIR, paths.images.out, 'favicon.ico')));

/**
 * NOTE: Static assets are assumed to be 'immutable' and is distinguished by a unique content hash
 * generated by Webpack.
 */
app.use(express.static(path.join(BASE_DIR, paths.resources), {
	maxAge: dev ? 0 : process.env.CACHE_DURATION_STATIC,
	etag: false,
	lastModified: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(languageDetector);

// SSL
/**
 * NOTE: Since SSL is only used on the heroku production dyno, no internal https server is required,
 * the following middlewares should only be applied within this environment.
 */
if (ssl) {

	app.use(redirectSSL);
}

// Caching
/**
 * NOTE: The 'Cache-Control' header is set by individual routes / routers,
 * 	'Etag' and 'Last-Modified' are preset with express defaults.
 */
app.set('apiCache', apicache.newInstance({
	statusCodes: {
		include: [200]
	}
}));

// Routes
app.use('/api', apiRouter(app));
app.use('/webhooks', webhooksRouter(app));

if (maintenance) {
	app.use(holding);
}
else {
	app.use(appRouter(app));
}

// Error Handling
app.use(errorHandler);

// App Init
if (maintenance) {

	init();
}
else {

	getSiteMap()
		.then(app.set.bind(app, 'siteMap'))
		.then(init)
		.catch(logger.error.bind(logger));
}

function init () {
	app.listen(app.get('port'), postInit);
}

/* eslint-disable consistent-return */
function postInit (err) {

	if (err) {
		return logger.error(err);
	}

	logger.info(`Running server on port: ${ app.get('port') }`);

	if (dev && sync && !debug) {
		initBrowserSync();
	}
}

/* eslint-enable */

function initBrowserSync () {

	browserSync({
		proxy: `localhost:${ app.get('port') }`,
		files: [{
			match: [
				path.join(BASE_DIR, paths.scripts.out, '**', '*.js'),
				path.join(BASE_DIR, paths.styles.out, '**', '*.css')
			],
			options: {
				ignored: '*.map.css'
			}
		}]
	});
}