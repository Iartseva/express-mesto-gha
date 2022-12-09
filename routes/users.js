const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const { regexp } = require('../utils/constants');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getMySelf,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getMySelf);

router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexp.urlReg),
  }),
}), updateUserAvatar);

module.exports = router;
