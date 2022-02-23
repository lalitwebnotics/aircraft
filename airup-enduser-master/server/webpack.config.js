const path = require('path'),
nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: [
    'regenerator-runtime/runtime',
    './src/index.js'
  ],
  target: 'node',
  devtool: 'source-map',
  externals: [
    nodeExternals()
  ],
  devServer: {
    contentBase: './src',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /(node_modules)/,
        test: /\.js$/
      },
      {
        use: 'file-loader',
        exclude: /(node_modules)/,
        test: /\.(html|txt)$/
      }
    ]
  }
}
