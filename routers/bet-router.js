const { Router } = require('express');
const betController = require('../controllers/bet-controller');
const betRouter = Router();
// // const { requireAdmin } = require("../middleware/require-admin");
// const { requireLogin } = require('../middleware/require-login');

betRouter.get('/', betController.getAllBets);
betRouter.post('/', betController.createNewBet);
betRouter.get("/allBets/:id", betController.getAllBetsButUsers)
betRouter.get('/scroll/:id/:endIndex/:startIndex',betController.getBetsScroll);
betRouter.post('/take', betController.takeBet)
betRouter.get('/check/:id', betController.checkBets)
betRouter.get('/recent/:id', betController.getRecentBets);
betRouter.post('/winner', betController.setWinner)
betRouter.get('/future/:id', betController.getFutureBets);
betRouter.get('/futureTaken/:id', betController.getFutureTakenBets);

module.exports = { betRouter };
  