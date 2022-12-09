const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regex = /https?:\/{2}\b[^\\.][\w\-\\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/;

const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(regex),
  }).unknown(true),
}), createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
