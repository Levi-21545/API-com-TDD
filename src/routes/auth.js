const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const secret = 'Segredinho dos crias';

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', (req, res, next) => {
    app.services.user
      .findOne({ email: req.body.mail })
      .then((user) => {
        if (!user)
          throw new ValidationError('Usuário ou senha incorretos');

        if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
          const payload = {
            id: user.id,
            name: user.id,
            mail: user.mail
          };

          const token = jwt.encode(payload, secret);

          res.status(200).json({ token });
        } else
          throw new ValidationError('Usuário ou senha incorretos');
      })
      .catch((err) => next(err));
  });

  router.post('/signup', async (req, res, next) => {
    app.services.user
      .save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      })
      .catch((err) => next(err));
  });

  return router;
};
