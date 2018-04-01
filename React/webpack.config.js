const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = '';

const config = {
  entry: `${SRC_DIR}/app/index.js`,
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: `${PUBLIC_PATH}app/`
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Resume Builder',
      favicon: `${SRC_DIR}/app/favicon.ico`,
      publicPath: `${PUBLIC_PATH}app/`,
      template: `${SRC_DIR}/template.html`,
      filename: `${SRC_DIR}/index.html` // relative to root of the application
    })
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|ico|gif)$/,
        include: SRC_DIR,
        loader: 'file-loader'
      }
    ]
  }
};

module.exports = config;
