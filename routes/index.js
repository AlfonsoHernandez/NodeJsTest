var express = require('express');
var router = express.Router();


//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res, next) {
//expecting data variable called order--retrieve value using body-parser

    var value_name = req.body.order  //retrieve the data associated with order
    res.send("Your order was succesfully received: " + value_name);
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);


module.exports = router;


//call the controller function in database.js
//that is exported and named getAllOrders
