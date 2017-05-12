'use strict';

require('dotenv').config({ silent: true });

const { pick: fPick,
		flow: fFlow,
		entries: fEntries,
		reduce: fReduce
	} = require('lodash/fp'),
	path = require('path'),
	webpack = require('webpack');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin,
	CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
	DefinePlugin = webpack.DefinePlugin,
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	ManifestPlugin = require('webpack-manifest-plugin'),
	UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
	WebpackChunkHash = require('webpack-chunk-hash');

// Composed Functions
const getClientEnv = fFlow(fPick([
	'NODE_ENV',
	'PORT',
	'TWITTER_USER'
]), fEntries, fReduce((envVars, [key, value]) => {

	return Object.assign({}, envVars, {
		[key]: JSON.stringify(value)
	});

}, {}));

// Config Vars
const dev = process.env.NODE_ENV === 'development',
	paths = require('./config/paths'),
	publicPath = `/${ path.relative(paths.resources, paths.scripts.out) }/`,
	stylesPath = `${ path.relative(paths.scripts.out, paths.styles.out) }/`,
	basePlugins = [
		new DefinePlugin({
			'process.env': Object.assign({ 'CLIENT': true }, getClientEnv(process.env))
		}),
		new CommonsChunkPlugin({
			name: ['vendor'],
			minChunks: Infinity
		}),
		new WebpackChunkHash(),
		new ManifestPlugin({
			fileName: `${ path.relative(paths.scripts.out, paths.server) }/webpack-manifest.json`,
			publicPath
		}),
		new ExtractTextPlugin(dev ? `${ stylesPath }[name].css` : `${ stylesPath }[name].[contenthash].css`)
	];

// Webpack Config
module.exports = {
	devtool: dev ? 'inline-source-map' : 'source-map',
	entry: {
		vendor: [
			'isomorphic-fetch',
			'lodash',
			'react',
			'react-dom',
			'react-router',
			'react-redux',
			'redux',
			'redux-thunk',
			'remarkable'
		],
		main: [
			'normalize.css',
			'main.scss',
			'main.js'
		]
	},
	output: {
		path: paths.scripts.out,
		publicPath,
		filename: dev ? '[name].js' : '[name].[chunkhash].js',
		chunkFilename: dev ? '[name].js' : '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			'node_modules',
			__dirname,
			paths.universal,
			paths.scripts.src,
			paths.scripts.lib,
			paths.styles.main
		]
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [
						['es2015', { modules: false }],
						'stage-1',
						'react'
					],
					'plugins': [
						'transform-runtime',
						'lodash'
					]
				}
			}]
		}, {
			test: /\.(sass|scss|css)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [
								paths.styles.main
							],
							sourceMap: true
						}
					}
				]
			})
		}]
	},
	plugins: basePlugins.concat(dev ? [] : [
		new AggressiveMergingPlugin(),
		new UglifyJsPlugin({
			mangle: false,
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	])
};
