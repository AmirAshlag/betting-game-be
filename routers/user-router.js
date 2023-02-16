const { Router } = require('express');
const userController = require('../controllers/user-controller');
const userRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

userRouter.get('/coins/:coinsId', userController.getUserByCoins);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
userRouter.get('/logout', userController.Logout);

module.exports = { userRouter };
