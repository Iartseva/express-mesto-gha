const jwt = require('jsonwebtoken');
const NotAuth = require('../errors/NotAuth');

const { MYSECRETKEY = 'asdasdasdfg212fdcd' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new NotAuth('Необходима авторизация - Нет токена'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, MYSECRETKEY);
  } catch (error) {
    next(new NotAuth('Необходима авторизация - Токен не верифицирован'));
    return;
  }

  req.user = payload;

  next();
};
