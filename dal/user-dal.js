const { User } = require('../models/user-model');
const { Bet } = require('../models/bet-model');

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select('-password');
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function getUserById(userId) {
  return User.findById(userId);
}

function getUsers(filter = {}) {
  return User.find(filter).select('-password');
}

async function updateCoins(userId, coins) {
  return User.findByIdAndUpdate(userId, { coins });
}
async function addToWinner(userId, sum, betId) {
  Bet.findByIdAndUpdate(betId, { $set: { winner: userId } });
  return User.findByIdAndUpdate(userId, { $inc: { coins: sum } }); 
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  updateCoins,
  getUserById,
  addToWinner,
};
  