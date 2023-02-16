const { Router } = require('express');
const gameRouter = Router()
const { getGamesByDate, getGameById } = require('../controllers/game-controller');

gameRouter.get('/', getGamesByDate);
gameRouter.get('/ByDate/:date', getGamesByDate)
gameRouter.get('/ById/:Id', getGameById);

module.exports = { gameRouter };