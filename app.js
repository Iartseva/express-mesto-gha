const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const setErrors = require('./middlewares/setErrors');
/* const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users'); */

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use(errors());
app.use(setErrors);

mongoose.connect('mongodb://127.0.0.1/mestodb')
  .then(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  }))
  .catch((err) => console.log(err));
