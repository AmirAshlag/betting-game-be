const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  // _id - created by Mongo
  newBet: {
    type: String,
    required: true,
  },
  betHistory: {
    type: String,
  },

  betAmount: {
    type: Number,
    required: true,
  },
});

const Bet = mongoose.model('bets', betSchema);

module.exports = { Bet };
