module.exports = (err, req, res, next) => {
  const errorMap = {
    conflicts: 409,
  };
  const status = errorMap[err.code];
  console.log(err);

  if (!status) {
    return next(err);
  }

  return res.status(status).json({ message: err.message });
};
