const {
  NotFound,
} = require('../errors/allErrors');

const setErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: `Ошибка валидации данных! ${message}` });
  } else if (err.name === 'notFoundError') {
    next(new NotFound('Не найдено'));
  } else if (err.code === 11000) {
    res
      .status(409)
      .send({
        message: `Пользователь с Email: ${err.keyValue.email} уже существует!`,
      });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Ошибка сервера' : message,
    });
  }

  next();
};

module.exports = { setErrors };
