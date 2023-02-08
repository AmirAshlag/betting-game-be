const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id - created by Mongo
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  /**
   * total coins of users
   */
  coins: {
    type: Number,
    default: 1000, // if a new record is created without coins, defaults to 1000
  },
});
const User = mongoose.model('users', userSchema);

module.exports = { User };
