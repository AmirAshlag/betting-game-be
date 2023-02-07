const { Bet } = require('../models/bet-model');

async function createBet(bet) {
  const newBet = await Bet.create(bet);
  return newBet;
}

function getBets(filter = {}) {
  return Bet.find(filter).select('-password');
}

module.exports = {
  createBet,
  getBets,
};
