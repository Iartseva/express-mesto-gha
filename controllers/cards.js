const Card = require('../models/card');
const {
  ValidationError,
  NotFound,
  ForbiddenError,
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
      if (card.owner.toString().indexOf(req.user._id) === -1) {
        throw new ForbiddenError('Нельзя удалять карту другого пользователя');
      } else {
        return card;
      }
    })
    .then(() => {
      Card.findByIdAndDelete(req.params.cardId)
        .then((deletedCard) => res.send({
          likes: deletedCard.likes,
          _id: deletedCard._id,
          name: deletedCard.name,
          link: deletedCard.link,
          owner: deletedCard.owner,
        }));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
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
      res.send({
        likes: card.likes,
        _id: card._id,
        name: card.name,
        link: card.link,
        owner: card.owner,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
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
      res.send({
        likes: card.likes,
        _id: card._id,
        name: card.name,
        link: card.link,
        owner: card.owner,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Указаны некорректные данные'));
      } else {
        next(err);
      }
    });
};
