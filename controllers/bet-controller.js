const betDal = require('../dal/bet-dal');
const userDal = require('../dal/user-dal');
// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');

/**
 * @returns an error message if the user data is invalid
 */
async function createNewBet(req, res) {
  try {
    const bet = req.body;
    console.log(bet)
    // get the user's coins
    const coins = (await userDal.getUserById(bet.userOne.id)).coins;

    // check that user have enough coins
    if (coins < bet.amount) {
      res.status(400).json({ message: 'Not enough coins for this amount' });
      return;
    }
    // subtract the amount of coins from the user (updating the user balance)
    const updatedCoins = coins - bet.amount;
    await userDal.updateCoins(bet.userOne.id, updatedCoins);
    // create a new bet
    const newBet = await betDal.createNewBet(bet);
    res.send(newBet);
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

async function getAllBetsButUsers(req, res){
  const bets = await betDal.getAllBetsButUsers(req.params.id)
  res.send(bets)
}

const betController = {
  getAllBets,
  createNewBet,
  getAllBetsButUsers,
};

module.exports = betController;
