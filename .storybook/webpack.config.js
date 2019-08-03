module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts)$/,
      use: [{ loader: require.resolve('awesome-typescript-loader') }]
    },
    {
      test: /\.css|\.s([ca])ss$/,
      use: [{ loader: 'lit-scss-loader' }, 'extract-loader', 'css-loader', 'sass-loader']
    }
  );
  config.resolve.extensions.push('.ts');
  return config;
};
