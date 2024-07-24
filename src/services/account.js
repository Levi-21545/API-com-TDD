module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('accounts').where(filter).select();
  };

  const findById = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const save = async (account) => {
    if (!account.name)
      return { error: 'Nome é um atributo obrigatório' };
    if (!account.user_id)
      return { error: 'O id do usuário é um atributo obrigatório' };

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
