const [
	path,
	fs,
	packageJsonPlugin
] = [
		require('path'),
		require('fs'),
		require('generate-package-json-webpack-plugin')
	];

module.exports = (env) => {
	const ikarusSettings = JSON.parse(fs.readFileSync('ikarus.json', 'utf8'));

	const name = env.name || '';
	const version = env.version || '0.0.0';
	const description = env.description || '';
	const scope = ikarusSettings.scope || '@ikarus';
	const root = ikarusSettings.root || 'src';
	const elements = ikarusSettings.elements || 'elements';
	const dist = ikarusSettings.dist || 'dist';

	const basePackageValues = {
		'name': `${scope}/${name}`,
		'main': `${name}.js`,
		'module': `${name}.js`,
		version,
		description
	}

	const versionsPackageFilename = __dirname + '/package.json';

	return {
		entry: `./${root}/${elements}/${name}/lib/element.ts`,
		output: {
			path: path.resolve(`${dist}/${name}`),
			filename: `${name}.js`,
			library: `${scope.replace('@', '')}${name.charAt(0).toUpperCase() + name.slice(1)}`,
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
			minimize: true
		},
		plugins: [
			new packageJsonPlugin(basePackageValues, versionsPackageFilename)
		]
	}
}