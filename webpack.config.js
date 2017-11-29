const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const bootstrap = {
	entry: [
		__dirname + '/node_modules/bootstrap/scss/bootstrap.scss'
	],
	output: {
		filename: 'bundle.css',
		path: __dirname + '/build/stylesheets'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: function() {
									return [
										require("precss"),
										require('autoprefixer')
									];
								}
							}
						},
						'sass-loader'
					]
				})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader')
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=../font/[name].[ext]'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('../stylesheets/bundle.css')
	]
}

const sitejs = {
	entry: [
		'./source/javascripts/site.js'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/build/javascripts'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=../font/[name].[ext]'
			}
		]
	},
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
};

module.exports = [sitejs, bootstrap];
