/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const webpackConfig = require('../webpack.config');
const SETTINGS = require('../settings');

const serverConfig = {
    contentBase: SETTINGS.PUBLIC_PATH,
    publicPath: '/',
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
};

new WebpackDevServer(webpack(webpackConfig), serverConfig)
    .listen(SETTINGS.PORT, 'localhost', (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`
        Listening at ${chalk.bold.cyan(`http://localhost:${SETTINGS.PORT}/`)}.
        Serving files from ${chalk.bold.cyan(SETTINGS.PUBLIC_PATH)}.
        Browser will be opened automatically when webpack finish building.
      `);
        }
    });
