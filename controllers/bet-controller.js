const betDal = require('../dal/bet-dal');
const userDal = require('../dal/user-dal');
// const fs = require('fs');
// const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');

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
    const updatedCoins = coins - bet.amount * bet.userOneChoise.ratio;
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
  const bet = req.body.bet;
  console.log(bet);
  // get the user's coins
  const coins = (await userDal.getUserById(req.body.userTwoId)).coins;

  if (coins < bet.amount) {
    res.status(400).json({ message: 'Not enough coins for this amount' });
    return;
  }
  const updatedCoins = coins - bet.amount;
  await userDal.updateCoins(req.body.userTwoId, updatedCoins);
  const bets = await betDal.takeBet(bet._id, req.body.userTwoId);
  res.send(bets);
}

async function checkBets(req, res) {
  const currentDate = new Date().toISOString();
  console.log(mongoose.isValidObjectId(req.params.id));
  const id = mongoose.Types.ObjectId(req.params.id.toString());
  const bets = await betDal.getUsersOldBets(id, currentDate);
  if (bets.length === 0) {
    res.send('no updates');
  }
  console.log(bets);
  // res.send(bets);
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
      .then(async function (response) {
        // console.log(response.data.response);
        let game = response.data.response[0];
        game.scores.visitors.points > game.scores.home.points
          ? bet.userOneChoise.winner == game.teams.visitors.name
            ? userDal.addToWinner(bet.userOne, bet.amount, bet._id)
            : ((updated = await userDal.addToWinner(
                bet.userTwo,
                bet.amount * bet.userOneChoise.ratio,
                bet._id
              )),
              res.send([updated, bet.amount * bet.userOneChoise.ratio]))
          : bet.userOneChoise.winner == game.teams.home.name
          ? ((updated = await userDal.addToWinner(
              bet.userOne,
              bet.amount + bet.amount * bet.userOneChoise.ratio,
              bet._id
            )),
            res.send([updated, bet.amount]))
          : ((updated = await userDal.addToWinner(
              bet.userTwo,
              bet.amount * bet.userOneChoise.ratio + bet.amount,
              bet._id
            )),
            res.send([updated, bet.amount * bet.userOneChoise.ratio]));
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

async function getRecentBets(req, res) {
  const bets = await betDal.getMosetRecentBets(req.params.id)
  console.log(bets)
  res.send(bets)
}

async function setWinner(req, res){
  const updated = await betDal.setWinner(req.body.id, req.body.gameId)
  console.log(updated)
  res.send(updated)
}

async function getFutureBets(req, res){
  const bets = await betDal.getFutureBets(req.params.id)
  console.log(bets)
  res.send(bets)
}

const betController = {
  getAllBets,
  createNewBet,
  getAllBetsButUsers,
  getBetsScroll,
  takeBet,
  checkBets,
  getRecentBets,
  setWinner,
  getFutureBets,
};

module.exports = betController;
