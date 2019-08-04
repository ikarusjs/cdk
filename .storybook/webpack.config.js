const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push(
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
              path.resolve(__dirname, '../node_modules')
            ]
          }
        }
      ]
    }
  );
  config.resolve.extensions.push('.ts', '.js');
  config.resolve.symlinks = true;
  return config;
};
