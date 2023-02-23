const { Router } = require('express');
const userController = require('../controllers/user-controller');
const userRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

// users/coins/:userId
// localhost:8080/users/coins/asdk239dhu229udh29du
userRouter.get('/:userId', userController.getUserByUserId);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);

module.exports = { userRouter };
