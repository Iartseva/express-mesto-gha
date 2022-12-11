const Card = require('../models/card');
const {
  ValidationError,
  NotFound,
  ForbiddenError,
} = require('../errors/allErrors');
const { resStatusCreate } = require('../utils/constants');

module.exports.getAllCards = (req, res, next) => {
  Card.find({}).populate(['likes', 'owner'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(resStatusCreate).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Указаны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять карту другого пользователя');
      }
      card.remove()
        .then(() => res.send({ card }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указаны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена');
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указаны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена');
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указаны некорректные данные'));
      } else {
        next(err);
      }
    });
};
