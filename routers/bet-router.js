const { Router } = require('express');
const betController = require('../controllers/bet-controller');
const betRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

betRouter.get('/', betController.getAllBets);
// betRouter.get('/betsHistory', betController.betsHistory);
// betRouter.get('/totalCoins', betController.totalCoins);

betRouter.post('/', betController.createNewBet);

module.exports = { betRouter };
