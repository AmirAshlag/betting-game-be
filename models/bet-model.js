const mongoose = require('mongoose');

const UsersChoiseSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  bet: {
    winner: String,
    overUnder: ['over', 'under'],
    by: Number,
  },
  type: Object
});

const UsersChoiseSchema2 = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  bet: {
    winner: String,
    overUnder: ['over', 'under'],
    by: Number,
  },
  type: Object,
});

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
    enum: ['3 point shots', 'game score', 'rebound', 'game score against user', 'asists'],
  },
  /**
   * height of the bet
   */
  amount: {
    type: Number,
    required: true,
  },
  userOne: UsersChoiseSchema,
  userTwo: UsersChoiseSchema2,
  gameId: {
    type: Number,
    required: true,
  },

  isFinished: {
    type: Boolean,
    default: false,
  },
});

const Bet = mongoose.model('bets', betSchema);

module.exports = { Bet };

// 	userOne: {
// 		'id': "63e0f36c49d892861762ae6b",
// 		'bet': {
// 			"winner": "pistons",
// 			"overUnder": 'over',
// 			"by": 8
// 					 }
// },