const { Router } = require('express');
const userController = require('../controllers/user-controller');
const userRouter = Router();

userRouter.get('/getUser/:userId', userController.getUserByUserId);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
userRouter.get('/logout', userController.logout);

module.exports = { userRouter };
