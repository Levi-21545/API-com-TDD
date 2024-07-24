module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user
      .findAll()
      .then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    app.services.user
      .save(req.body)
      .then((result) => {
        res.status(201).json(result[0]);
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  };

  return {
    findAll,
    create
  };
};
