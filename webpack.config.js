const webpack = require('webpack');

module.exports = {
	entry: [
		'./source/javascripts/site.js'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/build/javascripts'
	},
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

