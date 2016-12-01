'use strict';

require('dotenv').config({ silent: true });

const apiRouter = require('routers/api'),
	appRouter = require('routers/app'),
	bodyParser = require('body-parser'),
	browserSync = require('browser-sync'),
	compression = require('compression'),
	cors = require('cors'),
	express = require('express'),
	favicon = require('serve-favicon'),
	getSiteMap = require('lib/getSiteMap'),
	helmet = require('helmet'),
	httpErrorHandler = require('middlewares/httpErrorHandler'),
	logger = require('utils/logger'),
	morgan = require('morgan'),
	paths = require('config/paths'),
	pathJoin = require('utils/pathJoin'),
	robots = require('express-robots'),
	routes = require('routes');

// Constants
const BASE_DIR = pathJoin(__dirname, '..');

const app = express(),
	dev = process.env.NODE_ENV === 'development',
	production = process.env.NODE_ENV === 'production',
	sync = process.env.SYNC === 'true',
	debug = process.env.DEBUG;

// App Constants
app.set('port', process.env.PORT);

// App Wide Middlewares
app.use(morgan(dev ? 'dev' : 'combined'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(robots({
	UserAgent: '*',
	Disallow: production ? '/api' : '/'
}));
app.use(favicon(pathJoin(BASE_DIR, paths.images.out, 'favicon.ico')));
app.use(express.static(pathJoin(BASE_DIR, paths.resources)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: enable & configure contentSecurityPolicy property

// Routes / Error Handling
app.use('/api', apiRouter(app));
app.use(appRouter(app));
app.use(httpErrorHandler);

// App Init
getSiteMap().then((sitemapData) => {	
	
	app.set('sitemap', sitemapData);
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

