module.exports = {
	'plugins': [
		require('postcss-import'),
		require('postcss-mixins'),
		require('postcss-preset-env')({
			browsers: 'defaults',
			stage: 3,
			// Disable preserve so that the outputed CSS is consistent among all browsers,
			// diminuishing the probability of discovering bugs only when testing in older browsers
			preserve: false,
			// Enable features that we want, dispite being proposals yet
			features: {
				'custom-properties': false,
				'custom-media-queries': true,
				'not-pseudo-class': true,
				'nesting-rules': true,
			},
			insertAfter: {
				'nesting-rules': require('postcss-css-variables')(),
			},
			autoprefixer: {
				// We don't use prefixes unless they are really necessary, e.g.: when dealing with quirks
				// Therefore, we disable removing them
				remove: false,
				// See: https://github.com/csstools/postcss-preset-env/issues/133
				overrideBrowserslist: 'defaults',
			},
		}),
		require('postcss-color-function'),
	],
};
