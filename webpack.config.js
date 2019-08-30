const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/Laika.js',
  output: {
    path: path.resolve(''),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  externals: {
    react: 'commonjs react',
  },
}
