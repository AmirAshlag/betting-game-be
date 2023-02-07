const jwt = require('jsonwebtoken');
const betDal = require('../dal/bet-dal');
// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');

/**
 * @returns an error message if the user data is invalid
 */
async function createNewBet(req, res) {
  try {
    const bet = req.body;
    const newBet = await betDal.createNewBet(...bet, betAmount);
    res.json(newBet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

async function getAllBets(req, res) {
  try {
    const bets = await betDal.getBets();
    res.json({ bets });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const betController = {
  getAllBets,
  createNewBet,
};

module.exports = betController;
