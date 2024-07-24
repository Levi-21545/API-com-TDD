module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.account
      .findAll()
      .then((result) => res.status(200).json(result));
  };

  const findById = (req, res) => {
    app.services.account
      .findById({ id: req.params.id })
      .then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    app.services.account
      .save(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  };

  const update = async (req, res) => {
    app.services.account
      .update(req.params.id, req.body)
      .then((result) => {
        res.status(200).json(result[0]);
      });
  };

  const remove = async (req, res) => {
    app.services.account
      .remove(req.params.id)
      .then(() => res.status(204).send());
  };

  return {
    findAll,
    findById,
    create,
    update,
    remove
  };
};
