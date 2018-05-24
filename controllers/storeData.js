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

        var CUSTOMERS = db.collection('shipping');

        var customerdata = {
            _id: shippingID,
        };

        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;

            res.render('result', {text: req.body});
        });

    });
};
