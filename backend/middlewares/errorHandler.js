const errorHandler = (err, req, res, next) => {
  res.json({ success: false, error: err.message });
};

module.exports = errorHandler;
