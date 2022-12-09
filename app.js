const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
const { setErrors } = require('./middlewares/setErrors');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
const regex = /https?:\/{2}\b[^\\.][\w\-\\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Такой страницы не существует',
  });
});

app.use(errors());
app.use(setErrors);

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  }))
  .catch((err) => console.log(err));
