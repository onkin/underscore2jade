const isProduction = process.env.NODE_ENV == 'production';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(__dirname);
module.exports = {
    context: path.join(__dirname, 'resources'),

    entry: {
        underscore2jade: 'index'
    },

    output: {
        path: path.join(__dirname, 'assets'),
        publicPath: '/assets/',
        filename: '[name].js',
        chunkfilename: '[id].js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /[\/\\]node_modules[\/\\]/,
            loader: 'babel?presets[]=es2015'
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.css(\?.*)?$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss?browsers=last 2 versions')
        },
        {
            test: /\.scss(\?.*)?$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss?browsers=last 2 versions!sass')
        }]
    },

    resolve: {
        root: path.join(__dirname, 'resources'),
        extensions: ['', '.js', '.json', '.jade', '.html', '.scss', '.css']
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devtool: isProduction ? 'cheap-source-map' : 'source-map'
};

if (isProduction) {
    module.exports.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    unsafe: true
                }
            })
            );
}
