const generalErrorHandler = (_) => (error, req, res, next) => {
  if (error.code) {
    return res
      .status(error.code)
      .json({error: error.message});
  }

  res
    .status(505)
    .json({error: error.message});
};

module.exports = {
  generalErrorHandler,
};
