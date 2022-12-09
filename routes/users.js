const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getAllUsers, getUserById, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');

const regex = /^([^@\s]+@([-A-Za-z0-9]{1,}\.){1,2}[-A-Za-z]{2,})$/u;

router.get('/', auth, getAllUsers);
router.get('/me', auth, getUserInfo);

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
}), updateUserInfo);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regex),
  }),
}), updateAvatar);

module.exports = router;
