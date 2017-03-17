const express = require('express');
const path = require('path');
const app = express();
const chalk = require('chalk');

const log = console.log;
const port = 3000;
const target = '../dist';

app.set('port', port);
app.use(express.static(path.join(__dirname, target)));

const server = app.listen(port, function() {
  log(chalk.bold(`Now serving on ${port}`));
});
