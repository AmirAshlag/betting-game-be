const { Bet } = require('../models/bet-model');

async function createNewBet(bet) {
  const newBet = await Bet.create(bet);
  return newBet;
}

function getBets(filter = {}) {
  return Bet.find(filter).select('-password');
}

async function getAllBetsButUsers(id){
  const bets = await Bet.find({'userOne': {"$ne": id}})
  return bets
}

async function getBetsByIndexes(id, startIndex, endIndex) {
  const bets = await Bet.find({
    userOne: { $ne: id },
    'status.long': { $ne: 'finished' },
  })
    .skip(startIndex)
    .limit(endIndex - startIndex);
  return bets;
}

async function takeBet(id){
  const bets = await Bet.findById(id).update()
}

module.exports = {
  createNewBet,
  getBets,
  getAllBetsButUsers,
  getBetsByIndexes,
  takeBet,
};
