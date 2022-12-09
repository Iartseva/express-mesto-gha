require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const setErrors = require('./middlewares/setErrors');
const { createUser, login } = require('./controllers/users');
const { NotFound } = require('./errors/NotFound');

const regex = /(http)?s?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+\-[\].$'*,;!~#?&//=]*)/;

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
  }),
}), createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFound('Cтраницы не сушествует'));
});

app.use(errors());
app.use(setErrors);

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  }))
  .catch((err) => console.log(err));
