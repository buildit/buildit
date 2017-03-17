const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const recursiveCopy = require('recursive-copy');

const log = console.log;
const src = 'src';
const target = 'dist';

if ( !fs.existsSync( target ) ) {
  log(chalk.white(`${target} does not exist. Creating it...`));
  fs.mkdirSync(target, (err, folder) => {
    if (err) {
      log(chalk.red(`Error creating ${folder}: ${err}`));
      throw err;
    }
    log(chalk.green(`${folder} created`));
  });
  log(chalk.green(`${target} created`));
} else {
  log(chalk.red(`${target} already exists. Did you want to clean it first?`));
}

const copyOptions = {
  overwrite: true
};

recursiveCopy(src, target, copyOptions)
  .then(function(results) {
    log(chalk.green(`Copied ${src} into ${target}`));
  })
  .catch(function(error) {
    log(chalk.red(`Copy from ${src} to ${target} failed: ${error}`));
  });
