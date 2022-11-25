const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '637f5e7817a655fb6b88bee8'
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Такой страницы не существует',
  });
});

mongoose.connect('mongodb://127.0.0.1/mestodb')
.then(app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}))
.catch(err => console.log(err));

