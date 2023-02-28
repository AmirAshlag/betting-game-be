const { User } = require('../models/user-model');

async function createUser(user) {
  await User.create(user);
  return User.findOne({ email: user.email }).select('-password');
}

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function getUserById(userId) {
  return User.findById(userId)
}

function getUsers(filter = {}) {
  return User.find(filter).select('-password');
}

async function updateCoins(userId, coins) {
  return User.findByIdAndUpdate(userId, { coins });
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  updateCoins,
  getUserById,
};
