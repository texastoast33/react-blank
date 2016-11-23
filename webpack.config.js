var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var autoprefixer = require('autoprefixer');
var precss       = require('precss');

var common = {
	entry: APP_PATH,
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				include: APP_PATH
			},
			{
				test: /\.svg$/,
				loader: 'url-loader?limit=8192',
				include: APP_PATH
			},
			{
				test: /\.png$/,
				loader: 'url-loader?limit=8192',
				include: APP_PATH
			},
		]
	},
	postcss: function () {
		return [autoprefixer, precss];
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'UI Boilerplate',
			template: path.resolve(APP_PATH, 'index.html'),
			favicon: path.resolve(APP_PATH, 'images', 'favicon.ico'),
			inject: false
		})
	]
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.s?css$/,
					loaders: ['style', 'css', 'postcss', 'sass'],
					include: [APP_PATH, path.resolve(ROOT_PATH, 'node_modules')]
				}
			]
		},
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			port: 3000,
			progress: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
};

if (TARGET === 'build' || TARGET === 'stats') {
	module.exports = merge(common, {
		entry: {
			app: APP_PATH,
			vendor: Object.keys(pkg.dependencies)
		},
		output: {
			path: BUILD_PATH,
			filename: '[name].[chunkhash].js'
		},
		//this devtool option means that the source maps are much smaller
		devtool: 'cheap-module-source-map',
		module: {
			loaders: [
				{
					test: /\.s?css$/,
					loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
					include: [APP_PATH, path.resolve(ROOT_PATH, 'node_modules')]
				}
			]
		},
		plugins: [
			new Clean(['dist']),
			new ExtractTextPlugin('styles.[chunkhash].css'),
			new webpack.optimize.CommonsChunkPlugin(
				'vendor',
				'[name].[chunkhash].js'
			),
			new webpack.DefinePlugin({
				'process.env': {
					// This affects react lib size
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	});
}
