const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');
const {
  validationGetUserById, validationUpdateUserInfo, validationUpdateAvatar,
} = require('../utils/validationRequest');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validationGetUserById, getUserById);
router.patch('/me', validationUpdateUserInfo, updateUserInfo);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
