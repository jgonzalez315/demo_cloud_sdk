var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Demo Cloud SDK', valor: '34' });
});

router.post('/payment', function(req,res){
  console.log(req.body);
  
  // Validate required fields
  if (!req.body.amount || !req.body.description || !req.body.identifier) {
    return res.status(400).json({ 
      error: 'Missing required fields: amount, description, and identifier are required' 
    });
  }

  // Validate amount is a valid number
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ 
      error: 'Amount must be a valid positive number' 
    });
  }

  //Load the request module
  var request = require('request');
  var requestValues = {
    mode:"raw",
    serial_number: req.body['serial-number'] || 'PN32226W41579',
    amount: amount,
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
      return res.status(500).json({ 
        error: 'Internal server error', 
        details: error.message 
      });
    } else {
      console.log(response.statusCode, body);
      try {
        const responseData = JSON.parse(body);
        return res.status(response.statusCode).json(responseData);
      } catch (e) {
        return res.status(response.statusCode).json({ 
          message: 'Payment request processed', 
          statusCode: response.statusCode,
          body: body 
        });
      }
    }
  });
})

module.exports = router;

