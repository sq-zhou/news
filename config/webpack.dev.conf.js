const webpack = require('webpack');
const opn = require('opn');
const path = require("path");
const webpackFile = require("./webpack.file.conf");

let config = {
    mode: 'development',
    entry: {
        index: ['babel-polyfill', path.join(__dirname, '../src/client/index.js')],
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".pcss", "sass"],
        alias: {
            Config: path.resolve(__dirname, '../src/client/config'),
            Component: path.resolve(__dirname, '../src/client/component'),
            Page: path.resolve(__dirname, '../src/client/page'),
            Action: path.resolve(__dirname, '../src/client/store/actions'),
        },
    },
    output: {
        path: path.join(__dirname + "../dev"),
        filename: 'js/[name].js',
        chunkFilename: "js/[name].js",
        publicPath: ''
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    'cache-loader',
                    'babel-loader',
                ],
                include: [
                    path.resolve(__dirname, "../src/client")
                ],
                exclude: [
                    path.resolve(__dirname, "../node_modules")
                ],
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap',
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=' + "resource" + '/'
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        inline: true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/api': 'http://127.0.0.1:3000',
        }
    }
};
module.exports = config;