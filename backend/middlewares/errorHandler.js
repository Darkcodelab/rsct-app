const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.json({ success: false, error: err.message });
};

module.exports = errorHandler;
