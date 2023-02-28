const { Bet } = require('../models/bet-model');

async function createNewBet(bet) {
  const newBet = await Bet.create(bet);
  return newBet;
}

function getBets(filter = {}) {
  return Bet.find(filter).select('-password');
}

async function getAllBetsButUsers(id) {
  const bets = await Bet.find({ userOne: { $ne: id } });
  return bets;
}

async function getBetsByIndexes(id, startIndex, endIndex, currentDate) {
  const bets = await Bet.find({
    userOne: { $ne: id },
    userTwo: { $exists: false },
    'game.date.start': { $gt: currentDate },
  })
    .skip(startIndex)
    .limit(endIndex - startIndex);
  return bets;
}

async function takeBet(id, userTwoId) {
  const bets = await Bet.findByIdAndUpdate(id, { $set: { userTwo: userTwoId } }, { new: true });
  return bets;
}

async function getUsersBets(id, currentDate) {
  const bets = await Bet.find({
    userOne: { id },
    userTwo: { id },
    'game.date.start': { $gt: currentDate },
  });
  return bets;
}

module.exports = {
  createNewBet,
  getBets,
  getAllBetsButUsers,
  getBetsByIndexes,
  takeBet,
  getUsersBets,
};
