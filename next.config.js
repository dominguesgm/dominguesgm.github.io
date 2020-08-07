const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['three/examples/jsm']);
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withPlugins([
	[
		withCSS,
		{
			cssModules: true,
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: process.env.NODE_ENV === 'development' ? '[name]_[local]___[hash:base64:5]' : '[hash:base64:5]',
			},
		},
	], [
		withFonts,
	], [
		withTM,
	],
], {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.pdf$/,
			include: [
				path.resolve(__dirname, 'src/shared/media'),
			],
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'static/',
					publicPath: '_next/static/',
				},
			},
		});

		config.module.rules.push({
			test: /\.glb$/,
			include: [
				path.resolve(__dirname, 'src'),
			],
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'static/',
					publicPath: '_next/static/',
				},
			},
		});

		return config;
	},
});
