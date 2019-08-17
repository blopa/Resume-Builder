/* eslint-disable no-console */

const bluebird = require('bluebird');
const publish = bluebird.promisify(require('gh-pages').publish);
const chalk = require('chalk');
const rimraf = bluebird.promisify(require('rimraf'));
const build = require('./build');
const SETTINGS = require('../settings');

rimraf(SETTINGS.PUBLIC_PATH)
    .then(() => console.log(chalk.green.bold`✔ Removed old public folder`))
    .then(build)
    .then(() => console.log(chalk.yellow`Deploying to Github Pages...`))
    .then(() => publish(SETTINGS.PUBLIC_PATH))
    .then(() => console.log(chalk.green.bold`✔ Successfully deployed to Github pages!`))
    .catch((error) => console.error(chalk.red.bold`✗ Error occured while deploying to Github Pages:`, '\n', error));
