const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  // _id - created by Mongo

  // type
  // amount (gova)
  // userId
  // betAgainstUserId // optional
  // isFinished: boolean

  type: {
    // Bet.create({ ... })
    type: String,
    required: true,
    // enforces that the type will be a string from this array
    enum: ['3 point shots', 'game score', 'rebound', 'game score against user'],
  },
  /** 
   * height of the bet
   */
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  betAgainstUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

const Bet = mongoose.model('bets', betSchema);

module.exports = { Bet };
