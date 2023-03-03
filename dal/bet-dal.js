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

async function getUsersOldBets(id, currentDate) {
  const bets = await Bet.find({
    $or: [{ userOne: id }, { userTwo: id }],
    'game.date.start': { $lt: currentDate },
    'game.status.long': { $ne: 'Finished' },
  });

  for (let bet of bets) {
    await bet.update({ $set: { 'game.status.long': 'Finished' } });
  }
  return bets;
}

async function getMosetRecentBets(id) {
  const bets = Bet.find({
    $or: [{ userOne: id }, { userTwo: id }],
    'game.status.long': { $eq: 'Finished' },
  })
    .sort({ 'game.date.start': -1 })
    .limit(4);
  return bets
}

async function setWinner(id, gameId) {
  const updated = await Bet.findByIdAndUpdate(gameId, { $set: { winner: id } }, { new: true });
  return updated;
}

module.exports = {
  createNewBet,
  getBets,
  getAllBetsButUsers,
  getBetsByIndexes,
  takeBet,
  getUsersOldBets,
  getMosetRecentBets,
  setWinner
};
