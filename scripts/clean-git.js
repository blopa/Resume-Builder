/* eslint-disable no-console */

const yesno = require('yesno');
const chalk = require('chalk');
const blubird = require('bluebird');
const rimraf = blubird.promisify(require('rimraf'));

const prompt = `${chalk.yellow`You are going to delete the .git folder`}.
Are you sure you want to continue? (${chalk.cyan`Y/n`}) >`;

const handleDeleteSuccess = () => {
    console.log(`
    ${chalk.green`✔ Git folder was succefully deleted`}.
    Now you can init your own repository here. For more instructions visit
    ${chalk.cyan`https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/`}
  `);

    process.exit(0);
};

const handleDeleteError = (error) => {
    console.log(`
    An error occured while .git folder removing:
    ${chalk.red(error.message)}
  `);

    process.exit(1);
};

const handleDeleteCancel = () => {
    console.log(`
    ${chalk.red`.git folder deletion was canceled`}
  `);

    process.exit(0);
};

yesno.ask(prompt, true, (response) => {
    if (response) {
        rimraf('.git')
            .then(handleDeleteSuccess)
            .catch(handleDeleteError);
    } else {
        handleDeleteCancel();
    }
});
