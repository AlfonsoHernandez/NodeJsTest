var express = require('express');
var router = express.Router();


//Load the controllers from the controllers directory
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection
var controllerMongoCollectionStore = require('../controllers/storeData');


//GET for homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//From Exercise M1 - get all orders passed from review.php
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

//POST - storeData - Write shopping cart information to the database
router.post("/storeData", controllerMongoCollectionStore.storeData);



module.exports = router;

//NOTES-----------
//call the controller function in database.js
//that is exported and named getAllOrders
