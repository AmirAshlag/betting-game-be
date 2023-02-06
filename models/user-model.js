const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  coins: {
    type: Number,
    default: 1000,
  },
});
const User = mongoose.model('users', userSchema);

module.exports = { User };
