'use strict';

require('dotenv').config({ silent: true });

const apiRouter = require('routes/api'),
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
	logger = require('utils/logger'),
	morgan = require('morgan'),
	paths = require('config/paths'),
	pathJoin = require('utils/pathJoin'),
	robots = require('express-robots'),
	webhooksRouter = require('routes/webhooks');

// Constants
const BASE_DIR = pathJoin(__dirname, '..');

const app = express(),
	dev = process.env.NODE_ENV === 'development',
	production = process.env.NODE_ENV === 'production',
	sync = process.env.SYNC === 'true',
	debug = process.env.DEBUG;

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
	Disallow: production ? ['/api', '/webhooks'] : '/'
}));
app.use(favicon(pathJoin(BASE_DIR, paths.images.out, 'favicon.ico')));
app.use(express.static(pathJoin(BASE_DIR, paths.resources), {
	maxage: production ? '1h' : 0
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRouter(app));
app.use('/webhooks', webhooksRouter(app));
app.use(appRouter(app));

// Error Handling
app.use(errorHandler);

// App Init
getSiteMap().then((siteMapData) => {

	app.set('siteMap', siteMapData);
	app.listen(app.get('port'), initApp);

}).catch(logger.error.bind(logger));

/* eslint-disable consistent-return */
function initApp (err) {

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
				pathJoin(BASE_DIR, paths.scripts.out, '**', '*.js'),
				pathJoin(BASE_DIR, paths.styles.out, '**', '*.css')
			],
			options: {
				ignored: '*.map.css'
			}
		}]
	});
}

