const { Router } = require('express');
const gameRouter = Router()
const {getGamesByDate} =require('../controllers/game-controller')

gameRouter.get('/', getGamesByDate);
gameRouter.get('/ByDate/:date', getGamesByDate)

module.exports = { gameRouter }