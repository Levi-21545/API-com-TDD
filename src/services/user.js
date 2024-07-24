const ValidationError = require('../errors/ValidationError');
const bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(['id', 'name', 'email']);
  };

  const findOne = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwd, salt);
  };

  const save = async (user) => {
    if (!user.name)
      throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email)
      throw new ValidationError('Email é um atributo obrigatório');

    if (!user.passwd)
      throw new ValidationError('Senha é um atributo obrigatório');

    const userDb = await findOne({ email: user.email });

    if (userDb) {
      throw new ValidationError(
        'Já existe um usuário com este email'
      );
    }

    user.passwd = getPasswdHash(user.passwd);

    return app.db('users').insert(user, ['id', 'name', 'email']);
  };

  return { findAll, findOne, save };
};
