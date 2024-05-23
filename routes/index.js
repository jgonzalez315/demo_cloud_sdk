var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', valor: '34' });
});

router.post('/payment', function(req,res){
  console.log(req.body);
  //Load the request module
  var request = require('request');
  var requestValues = {
    mode:"raw",
    serial_number: 'PN32226W41579',
    amount: parseFloat(req.body.amount),
    //tip: 1,
    description: req.body.description,
    identifier: req.body.identifier
  }
  console.log( JSON.stringify(requestValues));
//Lets configure and request
  request({
    url: 'https://kushkicollect.billpocket.dev/push-notifications', //URL to hit
   // qs: {from: 'example', time: +new Date()}, //Query string data
    method: 'POST', // specify the request type
    headers: { // speciyfy the headers
      'Content-Type': 'application/json',
      'X-BP-AUTH': '2a09ec6e1ab1e7c6b0a623e5c7016bf4f55c36c4a5f8758826c39050055d0696'
    },
    body: JSON.stringify(requestValues) //Set the body as a string
  }, function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
    }
  });
})

module.exports = router;

