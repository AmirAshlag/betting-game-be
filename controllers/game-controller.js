const axios = require('axios');


function getGamesByDate(req,res){
    console.log(req.params)

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
    console.log(today);
    if (Object.keys(req.params).length > 0){
        today = req.params.date
    } else {
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
        res.send(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
}

module.exports = { getGamesByDate };