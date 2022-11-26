const errorPost = 400;
const errorNotFound = 404;
const errorServer = 500;

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const setError = (res, err) => {
  if (err.name === 'NotFoundError') {
    return res.status(errorNotFound).send({ message: `${err.message}` });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(errorPost).send({ message: `${err.message}` });
  }
  return res.status(errorServer).send({ message: `${err.message}` });
};

module.exports = {
  setError, NotFound,
};
