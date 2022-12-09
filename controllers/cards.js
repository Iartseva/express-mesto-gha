const Card = require('../models/card');
const {
  ForbiddenError,
  NotFound,
} = require('../errors/allErrors');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findOne({ cardId })
    .orFail(new NotFound(`${cardId} не найдена!`))
    .then((card) => {
      if (card.owner.toString() === owner) {
        card.delete()
          .then(() => res.status(200).send('Карта удалена'));
      } else {
        next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFound('Карта с данным ID не найдена'))
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFound('Карта с данным ID не найдена'))
    .then((card) => res.send({ card }))
    .catch(next);
};
