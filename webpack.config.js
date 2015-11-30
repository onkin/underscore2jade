const release = process.env.NODE_ENV == 'release';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'resources'),

	entry: {
		'underscore2jade': 'underscore2jade'
	},

	output: {
		path: path.join(__dirname, 'assets'),
		publicPath: '/assets/',
		filename: '[name].js',
		chunkfilename: '[id].js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /[\/\\]node_modules[\/\\]/,
				loader: "babel?presets[]=es2015"
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.html$/,
				loader: 'underscore-template-loader'
			},
			{
				test: /\.css(\?.*)?$/,
				loader: ExtractTextPlugin.extract('style', "css!autoprefixer?browsers=last 2 versions")
			},
			{
				test: /\.scss(\?.*)?$/,
				loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!sass')
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'url?limit=10000&name=[path][name].[ext]',
					'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			},
			{
				test: /\.(woff|ttf|eot)(\?.*)?$/,
				loader: 'url?limit=10000&name=[path][name].[ext]'
			}
		]
	},

	resolve: {
		root: path.join(__dirname, 'resources'),
		extensions: ['', '.js', '.json', '.jade', '.html', '.scss', '.css']
	},

	plugins: [
		new webpack.ContextReplacementPlugin(/node_modules[\/\\]moment[\/\\]locale/, /en/),
		new ExtractTextPlugin('[name].css'),
		//new webpack.optimize.UglifyJsPlugin({
		//	compress: {
		//		warnings: false,
		//		unsafe: true
		//	}
		//})
	],

	devtool: 'source-map'
};