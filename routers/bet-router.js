const { Router } = require('express');
const betController = require('../controllers/user-controller');
const betRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

betRouter.get('/', betController.getAllUsers);
// userRouter.post('/login', userController.login);
// userRouter.post('/signup', userController.signup);

module.exports = { betRouter };
