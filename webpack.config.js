module.exports = function (env, argv) {
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const SRC_DIR = path.resolve(__dirname, 'src');
  const DIST_DIR = path.resolve(__dirname, 'dist');
  const PUBLIC_PATH = '';
  let HTML_PATH;
  let minimize = false;

  if (argv.mode === 'production') {
    HTML_PATH = DIST_DIR;
    minimize = true;
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
      minimize: minimize,
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
        title: 'Resume Builder v1.0.4',
        favicon: `${SRC_DIR}/app/favicon.ico`,
        publicPath: `${PUBLIC_PATH}app/`,
        template: `${SRC_DIR}/template.html`,
        filename: `${HTML_PATH}/index.html`
      }),
      new MiniCssExtractPlugin({
        filename: `${PUBLIC_PATH}style.css`,
        chunkFilename: `${PUBLIC_PATH}[id].css`
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
          test: /\.scss$/,
          include: SRC_DIR,
          // loaders: ['style-loader', 'css-loader', 'sass-loader']
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoader: 2
              }
            },
            'sass-loader'
          ]
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
