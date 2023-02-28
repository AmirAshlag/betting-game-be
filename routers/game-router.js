const { Router } = require('express');
const gameRouter = Router();
const {
  getGamesByDate,
  getGameById,
  getTeams,
  getGamesByTeamId,
} = require('../controllers/game-controller');

gameRouter.get('/', getGamesByDate);
gameRouter.get('/ByDate/:date', getGamesByDate);
gameRouter.get('/ById/:Id', getGameById);
gameRouter.get('/teams', getTeams);
gameRouter.get('/teams/:teamId', getGamesByTeamId);

module.exports = { gameRouter };
