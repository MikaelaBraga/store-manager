module.exports = (err, req, res, _next) => {
  console.log(err);
  return res.status(500).json({ message: 'Internar Server Error' });
};
