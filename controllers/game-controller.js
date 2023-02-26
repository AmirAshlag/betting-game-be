const axios = require('axios');

function getGamesByDate(req, res) {
  console.log(req.params);

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  console.log(req.params.date == 'false');
  if (req.params.date == 'false') {
    today = yyyy + '-' + mm + '-' + dd;
  } else {
    today = new Date(req.params.date);
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
  }

  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: { date: `${today}` },
    headers: {
      'X-RapidAPI-Key': '9bb573e2a6msh68425984afeb9f2p16011cjsn8273c5377197',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getGameById(req, res) {
  console.log(req.params);
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: { id: `${req.params.Id}` },
    headers: {
      'X-RapidAPI-Key': '9bb573e2a6msh68425984afeb9f2p16011cjsn8273c5377197',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(req.params);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

module.exports = { getGamesByDate, getGameById };
