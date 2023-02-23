const { Bet } = require('../models/bet-model');

async function createNewBet(bet) {
  const newBet = await Bet.create(bet);
  return newBet;
}

function getBets(filter = {}) {
  return Bet.find(filter).select('-password');
}

async function getAllBetsButUsers(id){
  const bets = await Bet.find({'userOne.id': {"$ne": id}})
  return bets
}

module.exports = {
  createNewBet,
  getBets,
  getAllBetsButUsers,
};
