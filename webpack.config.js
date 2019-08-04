const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');

module.exports = (env) => {
	const name = env.name || 'button';
	const version = env.version || '0.0.0';
	const description = env.description || '';

	const basePackageValues = {
		'name': `@ikarus/${name}`,
		'main': `${name}.js`,
		'module': `${name}.js`,
		version,
		description
	}

	const versionsPackageFilename = __dirname + '/package.json';

	return {
		entry: `./src/elements/${name}/lib/element.ts`,
		output: {
			path: path.resolve(`dist/${name}`),
			filename: `${name}.js`,
			library: `ikarus${name.charAt(0).toUpperCase() + name.slice(1)}`,
			libraryTarget: 'umd'
		},
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									'@babel/preset-typescript',
								],
								plugins: [
									'@babel/plugin-transform-runtime',
									'@babel/plugin-proposal-object-rest-spread',
									['@babel/plugin-proposal-decorators', { 'legacy': true }],
									['@babel/plugin-proposal-class-properties', { 'loose': true }]
								]
							}
						}
					]
				},
				{
					test: /\.css|\.s([ca])ss$/,
					use: [
						'lit-scss-loader',
						'extract-loader',
						'css-loader',
						'resolve-url-loader',
						{
							loader: 'sass-loader',
							options: {
								includePaths: [
									path.resolve(__dirname, 'node_modules')
								]
							}
						}
					]
				}
			]
		},
		resolve: {
			symlinks: true,
			extensions: ['.ts', '.js']
		},
		optimization: {
			nodeEnv: 'prodction',
			minimize: false
		},
		plugins: [
			new GeneratePackageJsonPlugin(basePackageValues, versionsPackageFilename)
		]
	}
}