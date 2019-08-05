const [_, path, fs] = [
  require('lodash'),
  require('path'),
  require('fs')
];

module.exports = ({ config }) => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  const paths = _.get(tsconfig, 'compilerOptions.paths', []);

  config.module.rules.push(
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
              path.resolve(__dirname, '../node_modules')
            ]
          }
        }
      ]
    }
  );
  config.resolve.extensions.push('.ts', '.js');
  config.resolve.symlinks = true;
  config.resolve.alias = _.reduce(paths, (result, value, key) => {
    result[key] = path.resolve(__dirname, '..', _.get(value, [0], ''));
    return result;
  }, {});
  return config;
};
