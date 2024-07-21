const app = require('express')();
app.use(require('express').json());

app.get('/users', (req, res) => {
  const users = [{ name: 'John Doe', mail: 'john@mail.com' }];

  res.status(200).json(users);
});

app.post('/users', (req, res) => {
  res.status(201).json(req.body);
});

app.get('/', (req, res) => {
  res.status(200).send();
});

module.exports = app;
