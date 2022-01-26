const joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }
  if (err.message === '"name" is required' || err.message === '"quantity" is required') {
    return res.status(400).json({ message: err.message });
  }

  return res.status(422).json({ message: err.message });
};
