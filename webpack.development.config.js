const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/Laika.js',
  output: {
    path: path.resolve(''),
    filename: 'laika.development.js',
    libraryTarget: 'umd',
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
    react: 'react',
    'react-dom': 'react-dom',
  },
}
