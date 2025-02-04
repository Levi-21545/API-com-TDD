const request = require('supertest');
const app = require('../../src/app');

test('Deve criar usuário via signup', () => {
  return request(app)
    .post('/auth/signup')
    .send({
      name: 'Heinsenberg',
      email: `${Date.now()}@gmail.com`,
      passwd: '123456'
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Heinsenberg');
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('passwd');
    });
});

test('Deve receber token ao logar', () => {
  const mail = `${Date.now()}@gmail.com`;

  return app.services.user
    .save({
      name: 'Heinsenberg',
      email: mail,
      passwd: '123456'
    })
    .then(() =>
      request(app)
        .post('/auth/signin')
        .send({ mail, passwd: '123456' })
    )
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Não deve autenticar usuário com senha errada', () => {
  const mail = `${Date.now()}@gmail.com`;

  return app.services.user
    .save({
      name: 'Heinsenberg',
      email: mail,
      passwd: '123456'
    })
    .then(() =>
      request(app)
        .post('/auth/signin')
        .send({ mail, passwd: '1234567' })
    )
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha incorretos');
    });
});

test('Não deve autenticar usuário com usuário inexistente', () => {
  return request(app)
    .post('/auth/signin')
    .send({ mail: 'nada', passwd: '1234567' })

    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha incorretos');
    });
});

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app)
    .get('/v1/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});
