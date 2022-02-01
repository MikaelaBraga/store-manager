const joi = require('joi');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (!joi.isError(err)) {
    return next(err);
  }
  if (err.message === '"name" is required' || err.message === '"quantity" is required') {
    return res.status(400).json({ message: err.message });
  }

  return res.status(422).json({ message: err.message });
};
