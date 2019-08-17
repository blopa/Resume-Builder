/* eslint-disable no-console */
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../webpack.config');

module.exports = function build() {
    console.log(chalk.yellow`Building bundle`);

    return new Promise((resolve, reject) => {
        webpack(config).run((err) => {
            if (err) { return reject(err); }
            console.log(chalk.green.bold`✔ Bundle was successfully built!`);
            return resolve();
        });
    });
};
