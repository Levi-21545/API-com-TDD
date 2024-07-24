const request = require('supertest');
const app = require('../../src/app');

const email = `${Date.now()}@mail.com`;

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir um usuário com sucesso', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Heinsenberg',
      email,
      passwd: '123456'
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Heinsenberg');
      expect(res.body).not.toHaveProperty('passwd');
    });
});

test('Deve armazenar senha criptografada', async () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Heinsenberg',
      email: `${Date.now()}@mail.com`,
      passwd: '123456'
    })
    .then(async (res) => {
      expect(res.status).toBe(201);
      
      const { id } = res.body;
      expect(res.body.id).not.toBeUndefined();

      const usrDB = await app.services.user.findOne({ id });

      expect(usrDB.passwd).not.toBeUndefined();
      expect(usrDB.passwd).not.toBe('123456');
    });
});

test('Não deve inserir usuário sem nome', () => {
  const email = `${Date.now()}@mail.com`;

  return request(app)
    .post('/users')
    .send({
      email,
      passwd: '123456'
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Não deve inserir usuário sem email', async () => {
  const result = await request(app).post('/users').send({
    name: 'Heinsenberg',
    passwd: '123456'
  });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir um usuário sem senha', (done) => {
  const email = `${Date.now()}@mail.com`;

  request(app)
    .post('/users')
    .send({
      name: 'Heinsenberg',
      email
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é um atributo obrigatório');
      done();
    });
});

test('Não deve inserir um usuário com email já existente', async () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Heinsenberg',
      email: 'walterwhite@gmail.com',
      passwd: '123456'
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(
        'Já existe um usuário com este email'
      );
    });
});
