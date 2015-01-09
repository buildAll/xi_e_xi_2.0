//MySQL Part
var mysql = require('mysql');

var pool = mysql.createPool({
 
  // host     : '123.56.92.81',
  // user     : 'wechat',
  // password : 'wechat', 
  host     : 'localhost',
  user     : 'root',
  password : 'Zb817941',
  database : 'new_xiexi',
 // socketPath : '/tmp/mysql.sock',
  socketPath : '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  port:3306
});


// var connection = mysql.createConnection({
//   host     : '123.56.92.81',
//   user     : 'wechat',
//   password : 'wechat',
//   socketPath : '/tmp/mysql.sock',
//   port:3306
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

// pool.getConnection(function(err, connection){
//   if (err) {
//     console.log(err);
//   } else{
//     console.log("OK");
//     console.log(connection);
//   };
//   });
var CRUD = require('mysql-crud');
var tableOrder = CRUD(pool, 'order');
var tableAddress = CRUD(pool, 'address');
var tableCityName = CRUD(pool, 'city_name');
var tableZoneName = CRUD(pool, 'zone_name');

var tableCustomer = CRUD(pool, 'customer');



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
      res.sendStatus("Order Added");
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
      res.sendStatus("Address Added");
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
          res.sendStatus(data);
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
         if (err) {
          console.log(err);
         } else{};
          res.sendStatus(data);
  })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});


app.get('/GetCity', function(req, res){
  tableCityName.load({},function(err,data){
          console.log(data);
         // userOrder = data;
          res.sendStatus(data);
  })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});

app.get('/GetZone', function(req, res){
  var cityID = Number(req.query.id);
  tableZoneName.load({"cityID":cityID},function(err,data){
          console.log(data);
          res.sendStatus(data);
  })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});

app.get('/addNewUser', function(req, res){
  console.log(req.query);
  var customer = {}; 
  customer.customer_phone = Number(req.query.tel);
  customer.wechat_id = Number(req.query.wechat_id);
  tableCustomer.create(customer,function(err,data){
          if (err) {
            console.log(err);
          } else{
            console.log(data);
            res.sendStatus("Sign Up successfully!");
          };
         
          //res.sendStatus(data);
  })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});

app.get('/isSignUp', function(req, res){
  console.log(req.query);
  var wechat_id = req.query.wechat_id;
  tableCustomer.load({"wechat_id":wechat_id},function (err,data) {
     if (err) {
      console.log(err);
      res.sendStatus("No");
     } else{
      if (data.length) {
        console.log("user has signed up\n");
          console.log(data);
        res.sendStatus("Yes");
      } else{
        console.log("can not find this user\n");
        res.sendStatus("No");
      };
      
     };
  }) 

  
  // var customer = {}; 
  // customer.customer_phone = Number(req.query.tel);
  // customer.wechat_id = Number(req.query.wechat_id);
  // tableCustomer.create(customer,function(err,data){
  //         if (err) {
  //           console.log(err);
  //         } else{
  //           console.log(data);
  //           res.sendStatus("Sign Up successfully!");
  //         };
         
  //         //res.sendStatus(data);
 // })
  // console.log(req);
  //console.log("The order is :" + userOrder);
  
});


 
app.listen(3000);
console.log('listening to http://localhost:3000');