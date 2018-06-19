const webpack = require('webpack');
const opn = require('opn');
const path = require("path");
const webpackFile = require("./webpack.file.conf");

let config = {
    mode: 'development',
    entry: {
        'index': './app/index.js'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".pcss", "sass"],
    },
    output: {
        path: __dirname + "../dev",
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
                    path.resolve(__dirname, "../app")
                ],
                exclude: [
                    path.resolve(__dirname, "../node_modules")
                ],
            },
            {
                test: /\.(css)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap',
                exclude: /node_modules/
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
        proxy: [
            {
                context: ['/api/**', '/u/**'],
                target: 'http://192.168.12.100:8080/',
                secure: false
            }
        ],
        after() {
            opn('http://localhost:' + this.port);
        }
    }
};
module.exports = config;