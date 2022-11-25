const errorPost = 400;
const errorGet = 404;
const errorServer = 500;

module.exports.setError = (res, err) => {
  if (err.name === 'NotFoundError') {
    return res.status(errorGet).send({ message: `${err.message}` });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(errorPost).send({ message: `${err.message}` });
  }
  return res.status(errorServer).send({ message: `${err.message}` });
};
