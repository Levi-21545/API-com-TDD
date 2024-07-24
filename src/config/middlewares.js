const knexLogger = require('knex-logger');

module.exports = (app) => {
  app.use(require('express').json());
  
  //app.use(knexLogger(app.db));
};
