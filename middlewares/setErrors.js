const ForbiddenError = require('../errors/ForbiddenError');
// const NotFound = require('../errors/NotFound');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');
// const ServerError = require('../errors/ServerError');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const setErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации данных! ${message}`));
  } else if (err.name === 'CastError') {
    next(new ForbiddenError(`Некорректные данные в запросе! ${message}`));
  } else if (err.code === 11000) {
    res.status(409).send({ message: `Пользователь с Email: ${err.keyValue.email} уже существует!` });
  } else {
    res.status(statusCode)
      .send(
        {
          message: statusCode === 500
            ? 'Ошибка сервера'
            : message,
        },
      );
  }

  next();
};

module.exports = { setErrors, NotFound };
