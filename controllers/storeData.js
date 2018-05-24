var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://hernandez:i84k8@ds243285.mlab.com:43285/heroku_9hbcfksr';
var express = require('express');
var router = express.Router();

//Export function so it can be accessed in index.js router
module.exports.storeData = function (req, res, next) {
    //Connect to mongodb
    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;

        //Generate unique product IDs for each item in the collections
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var orderID = Math.floor((Math.random() * 1000000000000) + 1);

        //Variables to access all four collections on the database
        var CUSTOMERS = db.collection('customer');
        var ORDERS = db.collection('orders');
        var BILLING = db.collection('billing');
        var SHIPPING = db.collection('shipping');

        //JSON variables for all information that will be written to the database
        var customerdata = {
            _id: customerID,
            FIRSTNAME: req.body['customer[firstName]'],
            LASTNAME: req.body['customer[lastName]'],
            STREET: req.body['customer[streetAddress]'],
            CITY: req.body['customer[city]'],
            STATE: req.body['customer[state]']
        };

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: req.body['customer[streetAddress]'],
            SHIPPING_CITY: req.body['customer[city]'],
            SHIPPING_STATE: req.body['customer[state]']
        };

        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDTYPE: req.body['billing[cardCompany]'],
            CREDITCARDNUMBER: req.body['billing[cardNumber]'],
            CREDITCARDEXP: req.body['billing[exp]'],
            CREDITCARDSECURITYNUM: req.body['CREDITCARDSECURITYNUM']
        };

        var orderdata = {
            _id: orderID,
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            PRODUCT_VECTOR: req.body['order'],
            ORDER_TOTAL: req.body.subtotal
        }

        //TESTS
        //console.log(req);
        //console.log("REQ-BODY");
        //console.log(req.body);
        //console.log(req.body['order']);


        //WRITE JSON variables to their respective collection
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;

        });

        SHIPPING.insertOne(shippingdata, function (err, result) {
            if (err) throw err;

        });

        BILLING.insertOne(billingdata, function (err, result) {
            if (err) throw err;

        });

        ORDERS.insertOne(orderdata, function (err, result) {
            if (err) throw err;
            res.render('result', {text: "Thank you for your order. Your order has been placed successfully"});
        });

    });
};
