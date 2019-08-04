const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts)$/,
      use: [{ loader: require.resolve('awesome-typescript-loader') }]
    },
    {
      test: /\.css|\.s([ca])ss$/,
      use: [
        'lit-scss-loader',
        'extract-loader',
        'css-loader',
        'resolve-url-loader',
        {
          loader: "sass-loader",
          options: {
            includePaths: [path.resolve(__dirname, '../node_modules')]
          }
        }
      ]
    }
  );
  config.resolve.extensions.push('.ts');
  return config;
};
