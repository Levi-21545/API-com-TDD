const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');
const util = require('util');
const knexLogger = require('knex-logger');

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

app.db = knex(knexfile.test);

app.use(knexLogger(app.db));

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

module.exports = app;
