const router = require('express').Router();
const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validationCreateCard, validationDeleteCard, validationLikeCard, validationDislikeCard,
} = require('../utils/validationRequest');

router.get('/', getAllCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationDeleteCard, deleteCard);
router.put('/:cardId/likes', validationLikeCard, likeCard);
router.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = router;
