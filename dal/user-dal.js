const { User } = require('../models/user-model');

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select('-password');
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function getUserByCoins(coins) {
  const user = await User.findOne({ coins });
}

async function getUserById(userId) {
  return User.findById(userId).select('coins');
}

function getUsers(filter = {}) {
  return User.find(filter).select('-password');
}

async function updateCoins(userId, coins) {
  // userId, coins -> puts the coins instead of the current user coins
  return User.findByIdAndUpdate(userId, { coins });
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  getUserByCoins,
  getUserById,
  updateCoins,
};
