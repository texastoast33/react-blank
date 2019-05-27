var path = require('path');
var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var pkg = require('./package.json');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var common = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader:'babel-loader'
                }],
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Staytion',
            template: path.resolve(APP_PATH, 'index.html'),
            favicon: path.resolve(APP_PATH, 'images', 'favicon.png'),
            inject: false
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000,
        progress: true
    }
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader'],
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
            rules: [
                {
                    test: /\.s?css$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
                    include: [APP_PATH, path.resolve(ROOT_PATH, 'node_modules')]
                }
            ]
        },
        plugins: [
            new Clean(),
            new ExtractTextPlugin('styles.[chunkhash].css'),
            new webpack.DefinePlugin({
                'process.env': {
                    // This affects react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: "initial",
                        minChunks: 3,
                        name: "commons",
                        enforce: true
                    },
                    vendor: {
                        test: /react|angluar|lodash/,
                        chunks: "initial",
                        name: "vendor",
                        enforce: true
                    }
                }
            }
        }
    });
}