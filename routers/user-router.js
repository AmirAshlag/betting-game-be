const { Router } = require('express');
const userController = require('../controllers/user-controller');
const userRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/"/user/:userId"', userController.getUserCoinsById);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);

module.exports = { userRouter };
