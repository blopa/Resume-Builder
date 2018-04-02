module.exports = function (env, argv) {
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const SRC_DIR = path.resolve(__dirname, 'src');
  const DIST_DIR = path.resolve(__dirname, 'dist');
  const PUBLIC_PATH = '';
  let HTML_PATH;

  if (argv.mode === 'production') {
    HTML_PATH = DIST_DIR;
  } else {
    HTML_PATH = SRC_DIR;
  }

  return {
    entry: {
      player: `${SRC_DIR}/app/index.js`,
      vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux', 'xlsx']
    },
    output: {
      path: `${DIST_DIR}/app`,
      publicPath: `${PUBLIC_PATH}app/`,
      filename: 'bundle.js'
    },
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          default: false,
          common: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            filename: 'vendor.js',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: false
        },
        title: 'Resume Builder',
        favicon: `${SRC_DIR}/app/favicon.ico`,
        publicPath: `${PUBLIC_PATH}app/`,
        template: `${SRC_DIR}/template.html`,
        filename: `${HTML_PATH}/index.html`
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
};
