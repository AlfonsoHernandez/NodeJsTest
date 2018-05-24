var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://hernandez:i84k8@ds243285.mlab.com:43285/heroku_9hbcfksr';
var express = require('express');
var router = express.Router();

//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode


module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;


        //get handle to the databse
        var theDatabase = client.db('heroku_9hbcfksr');


        //get collection of routes
        var Orders = theDatabase.collection('orders');
        var Shipping = theDatabase.collection('shipping');



        //FIRST showing you one way of making request for ALL routes and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log

        var object;

        Shipping.find({}).toArray(function(err, result){
            if(err) throw err;
            //response.render('getAllOrders', {shipping: result});
            object = result;
            console.log(result);
        });

        Orders.find({}).toArray(function(err, result){
            if(err) throw err;
            response.render('getAllOrders', {orders: result, shipping: "test"});
            console.log(result);
        });



        //close connection when your app is terminating.

    });//end of connect
};//end function



module.exports.storeData = function (req, res, next) {
    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;
    }

    var customerData = req.body.customer;

    var customerID = Math.floor((Math.random() * 1000000000000) + 1);
    var billingID = Math.floor((Math.random() * 1000000000000) + 1);
    var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

    var CUSTOMERS = db.collection('customer');


    var customerdata = {
        _id: customerID,
        FIRSTNAME: ['fname'],
        LASTNAME: shipment_info['lname'],
        STREET: shipment_info['add1'] + ' ' + shipment_info['add2'],
        CITY: shipment_info['city'],
        STATE: shipment_info['state'],
        ZIP: shipment_info['zipcode'],
        PHONE: shipment_info['phone']
    };

    CUSTOMERS.insertOne(customerdata, function (err, result) {
        if (err) throw err;
    })
}