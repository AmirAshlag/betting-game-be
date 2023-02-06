const { Router } = require('express');
const userController = require('../controllers/user-controller');
const userRouter = new Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
// userRouter.post('/:email/add-player', userController.addPlayer);

module.exports = { userRouter };
