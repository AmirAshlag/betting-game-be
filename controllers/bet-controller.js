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
    console.log(bet);
    // get the user's coins
    const coins = (await userDal.getUserById(bet.userOne)).coins;

    // check that user have enough coins
    if (coins < bet.amount) {
      res.status(400).json({ message: 'Not enough coins for this amount' });
      return;
    }
    // subtract the amount of coins from the user (updating the user balance)
    const updatedCoins = coins - bet.amount;
    await userDal.updateCoins(bet.userOne, updatedCoins);
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

async function getBetsScroll(req, res) {
  const currentDate = new Date().toISOString();
  try {
    const bets = await betDal.getBetsByIndexes(
      req.params.id,
      req.params.startIndex,
      req.params.endIndex,
      currentDate
    );
    res.send(bets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getAllBetsButUsers(req, res) {
  const bets = await betDal.getAllBetsButUsers(req.params.id);
  res.send(bets);
}

async function takeBet(req, res) {
  console.log(req.body);
  const bets = await betDal.takeBet(req.body.id, req.body.userTwoId);
  res.send(bets);
}

async function checkBets(req, res) {
  const currentDate = new Date().toISOString();
  // console.log(req.params.id)
  const bets = await betDal.getUsersBets(`${req.params.id}`, currentDate);
  console.log(bets)
  for (let bet of bets) {
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/games',
      params: { id: `${bet.game.id}` },
      headers: {
        'X-RapidAPI-Key': '9bb573e2a6msh68425984afeb9f2p16011cjsn8273c5377197',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("mydata",response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

const betController = {
  getAllBets,
  createNewBet,
  getAllBetsButUsers,
  getBetsScroll,
  takeBet,
  checkBets,
};

module.exports = betController;
