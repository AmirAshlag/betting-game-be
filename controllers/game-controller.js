const axios = require('axios');

const apiHeaders = {
  headers: {
    'X-RapidAPI-Key': '9bb573e2a6msh68425984afeb9f2p16011cjsn8273c5377197',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  },
};

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

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: { date: `${today}` },
    ...apiHeaders,
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

function getTeams(req, res) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams',
    ...apiHeaders,
  };
  axios
    .request(options)
    .then(function (response) {
      res.json(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getGamesByTeamId(req, res) {
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const startDate = today.toISOString().slice(0, 10);
  const endDate = nextWeek.toISOString().slice(0, 10);
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: { season: '2022', team: req.params.teamId, start_date: startDate, end_date: endDate },
    ...apiHeaders,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
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
    ...apiHeaders,
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

module.exports = { getGamesByDate, getGameById, getTeams, getGamesByTeamId };
