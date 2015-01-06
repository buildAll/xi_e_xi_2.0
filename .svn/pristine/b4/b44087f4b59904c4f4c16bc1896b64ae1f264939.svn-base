//MySQL Part
var mysql = require('mysql');

var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'Zb817941',
  database : 'xiexi',
  socketPath : '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  port:3306
});



var CRUD = require('mysql-crud');
var tableOrder = CRUD(pool, 'order');
var tableAddress = CRUD(pool, 'address');



//Server Part
var express = require('./node_modules/express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 

//Get post data from front-end and then save it into mysql 
app.post('/NewOrder', function(req, res){
   
    var data = req.body;
    var newOrder = {}; 
    newOrder.UserName = data.name;
    newOrder.UserTel = data.tel;
    //newOrder.Year = 2015;
    newOrder.Date = data.day.day.date;
    newOrder.Time = data.time.duration;
    newOrder.City = data.city;
    newOrder.Zone = data.zone;
    newOrder.Address = data.detailAddress;
     newOrder.UserID = data.userID;

    console.log(newOrder);

	tableOrder.create(newOrder, function (err, vals) {
	    //mysql callback
	    if (err) {
	    	console.log("CREATE ERROR : " + err);
	    	return;
	    };
	       
	    // console.log(vals); 
      res.send("Order Added");
	});

   
});


app.post('/NewAddress', function(req, res){
   
    var data = req.body;
    // console.log("below is the new Address \n");
    //console.log(data);
    var newAddress = {}; 
    newAddress.UserName = data.userName;
    newAddress.UserTel = data.userTel;
    newAddress.CityName = data.cityName;
    newAddress.Zone = data.zone;
    newAddress.Detail = data.detail;
    newAddress.UserID = data.userID;

   // console.log(newOrder);

  tableAddress.create(newAddress, function (err, vals) {
      //mysql callback
      if (err) {
        console.log("CREATE ERROR : " + err);
        return;
      };
         
      // console.log(vals); 
      res.send("Address Added");
  });

   
});

//Get User Info for display
app.get('/GetUserOrder', function(req, res){
	var userId = Number(req.query.id);
	var userOrder;
	console.log(userId);
	tableOrder.load({'UserID':userId},function(err,data){
         // console.log(data);
         // userOrder = data;
          res.send(data);
	})
	// console.log(req);
	//console.log("The order is :" + userOrder);
	
});


app.get('/GetUserAddress', function(req, res){
  var userId = Number(req.query.id);
  var userOrder;
  console.log(userId);
  tableAddress.load({'UserID':userId},function(err,data){
         // console.log(data);
         // userOrder = data;
          res.send(data);
  })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});

// app.get('/GetUserAddress', function(req, res){
  
// });
 
app.listen(3000);
console.log('listening to http://localhost:3000');