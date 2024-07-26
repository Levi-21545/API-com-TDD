const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = (user_id) => {
    return app.db('accounts').where({ user_id }).select();
  };

  const findById = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const save = async (account) => {
    if (!account.name)
      throw new ValidationError('Nome é um atributo obrigatório');

    if (!account.user_id)
      throw new ValidationError(
        'O id do usuário é um atributo obrigatório'
      );

    return app.db('accounts').insert(account, '*');
  };

  const update = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  const remove = (id) => {
    return app.db('accounts').where({ id }).del();
  };

  return { findAll, findById, save, update, remove };
};
