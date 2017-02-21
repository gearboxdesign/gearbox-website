'use strict';

require('dotenv').config({ silent: true });

const path = require('path'),
	webpack = require('webpack');

const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin,
	// CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
	DefinePlugin = webpack.DefinePlugin,
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const dev = process.env.NODE_ENV === 'development',
	paths = require('./config/paths'),
	basePlugins = [
		// new CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	filename: 'vendor.js',
		// 	minChunks: Infinity
		// }),
		new DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'PORT': JSON.stringify(process.env.PORT),
				'CLIENT': true
			}
		}),
		new ExtractTextPlugin(`${ path.relative(paths.scripts.out, paths.styles.out) }/styles.css`)
	];

module.exports = {
	devtool: dev ? 'inline-source-map' : 'source-map',
	entry: {
		// TODO: Add remaining vendor files.
		// vendor: [],
		main: [
			'normalize.css',
			'main.scss',
			'main.js'
		]
	},
	output: {
		path: paths.scripts.out,
		publicPath: `/${ path.relative(paths.resources, paths.scripts.out) }/`,
		filename: 'main.js'
	},
	resolve: {
		alias: {
			'lib/getComponent': path.resolve(paths.scripts.src, 'lib', 'getClientComponent')
		},
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
						'syntax-dynamic-import',
						'transform-runtime'
					]
				}
			}]
		}, {
			test: /\.(sass|scss|css)$/,
			loader: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader',
				loader: [
					{
						// NOTE: This query syntax may be revised to use options in later releases of css-loader.
						loader: 'css-loader?sourceMap',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						// NOTE: This query syntax may be revised to use options in later releases of sass-loader.
						loader: 'sass-loader?sourceMap',
						options: {
							includePaths: [
								paths.styles.main
							]
						}
					}
				]
			})
		}]
	},
	plugins: basePlugins.concat(dev ? [] : [
		new AggressiveMergingPlugin(),
		new UglifyJsPlugin({
			mangle: true,
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	])
};
