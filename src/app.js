const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');
const util = require('util');

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

module.exports = app;
