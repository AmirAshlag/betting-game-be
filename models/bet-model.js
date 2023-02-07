const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  // _id - created by Mongo
  NewBet: {
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
  coins: {
    type: Number,
    default: 1000, // if a new record is created without coins, defaults to 1000
  },
});
const Bet = mongoose.model('bets', betSchema);

module.exports = { Bet };
