var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://hernandez:i84k8@ds243285.mlab.com:43285/heroku_9hbcfksr';


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
            response.render('getAllOrders', {orders: result, shipping: object});
            console.log(result);
        });



        //close connection when your app is terminating.

    });//end of connect
};//end function