

const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withPlugins([
	[
		withCSS,
		{
			cssModules: true,
			cssLoaderOptions: {
				importLoaders: 1,
				localIdentName: '[local]___[hash:base64:5]',
			},
		},
	], [
		withFonts,
	],
]);
