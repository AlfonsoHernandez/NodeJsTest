var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://hernandez:i84k8@ds243285.mlab.com:43285/heroku_9hbcfksr';
var express = require('express');
var router = express.Router();

//to process data sent in on request need body-parser module
//var bodyParser = require('body-parser');
//var path = require('path'); //to work with separtors on any OS including Windows
//var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
//router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode

module.exports.storeData = function (req, res, next) {

    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        var CUSTOMERS = db.collection('customer');
        //var ORDERS = db.collection('orders');
        //var BILLING = db.collection('billing');
        //var SHIPPING = db.collection('shipping');

        var customerdata = {
            _id: customerID,
            FIRSTNAME: req.body['customer[firstName]'],
            LASTNAME: req.body['customer[lastName]'],
            STREET: req.body['customer[streetAddress]'],
            CITY: req.body['customer[city]'],
            STATE: req.body['customer[state]']
        };


        console.log(req);
        console.log("REQ>BODY");
        console.log(req.body);
        console.log(req.body['order[0][id]']);


        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;

            res.render('result', {text: "test"});
        });

    });
};
