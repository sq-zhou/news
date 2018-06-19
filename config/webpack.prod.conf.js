const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackFile = require('./webpack.file.conf');

let config = {
    mode: 'production',
    entry: {
        'index': './app/index.js'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".pcss", "sass"],
    },
    output: {
        path: path.resolve(webpackFile.proDirectory),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: "js/[name]-[id].[chunkhash:8].js",
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
        new ExtractTextPlugin('css/[name].[md5:contenthash:hex:8].css'),
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { 
                    removeAll: true 
                },
                safe: true
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            filename: "index" + '.html',
            template: 'index.html',
            inject: true,
            title: "index",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['manifest', 'vendor', 'common', 'index'],
            hash: true,
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin([webpackFile.proDirectory], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                                minimize: true,
                            }
                        },
                        "sass-loader?sourceMap",
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + webpackFile.resourcePrefix + '&outputPath=' + webpackFile.resource + '/'
            },
            {
                test: /\.swf$/,
                loader: 'file?name=js/[name].[ext]'
            }
        ]
    }
};

module.exports = config;
