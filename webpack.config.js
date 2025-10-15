module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              jsx: 'react-jsx',
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: '@jsdevtools/coverage-istanbul-loader',
          options: { esModules: true },
        },
        enforce: 'post',
        include: /src/,
        exclude: [/\.(e2e|spec|test)\./, /node_modules/, /cypress/],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
