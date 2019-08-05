const [_, path, fs, packageJsonPlugin] = [
  require('lodash'),
  require('path'),
  require('fs'),
  require('generate-package-json-webpack-plugin')
];

module.exports = (env) => {
  const ikarusSettings = JSON.parse(fs.readFileSync('ikarus.json', 'utf8'));
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  const paths = _.get(tsconfig, 'compilerOptions.paths', []);

  const name = _.get(env, 'name', '');
  const version = _.get(env, 'version', '0.0.0');
  const description = _.get(env, 'description', '');
  const scope = _.get(ikarusSettings, 'scope', '@ikarus');
  const root = _.get(ikarusSettings, 'root', 'src');
  const elements = _.get(ikarusSettings, 'elements', 'elements');
  const dist = _.get(ikarusSettings, 'dist', 'dist');

  const basePackageValues = {
    'name': `${scope}/${name}`,
    'main': `${name}.js`,
    'module': `${name}.js`,
    version,
    description
  };

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
                  '@babel/preset-typescript'
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
      extensions: ['.ts', '.js'],
      alias: _.reduce(paths, (result, value, key) => {
        result[key] = path.resolve(__dirname, _.get(value, [0], ''));
        return result;
      }, {})
    },
    optimization: {
      nodeEnv: 'prodction',
      minimize: true
    },
    plugins: [
      new packageJsonPlugin(basePackageValues, versionsPackageFilename)
    ]
  };
};
