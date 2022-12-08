const router = require('express').Router();

const {
  getAllUsers, getUserById, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/me', getUserInfo);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
