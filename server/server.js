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
// var tableCityName = CRUD(pool, 'city_name');
// var tableZoneName = CRUD(pool, 'zone_name');
var tableCityName = CRUD(pool, 'city');
var tableZoneName = CRUD(pool, 'region');

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

       var order = req.body;
       var newOrder = {}; 
      newOrder.city_id  = order.city_id 
      newOrder.city_name  = order.city_name
      newOrder.region_name = order.region_name 
      newOrder.contacter_name  = order.contacter_name 
      newOrder.contacter_phone = order.contacter_phone 
      newOrder.create_time = order.create_time 
      newOrder.customer_id = order.customer_id 
      newOrder.express_status_id = order.express_status_id 
      newOrder.is_canceled = order.is_canceled 
      newOrder.is_payed = order.is_payed 
      newOrder.order_id = order.order_id 
      newOrder.order_status_id = order.order_status_id 
      newOrder.product_id = order.product_id
      newOrder.region_id = order.region_id
      newOrder.reserve_day = order.reserve_day
      newOrder.reserve_month = order.reserve_month 
      newOrder.reserve_time_id = order.reserve_time_id 
      newOrder.reserve_year = order.reserve_year 
      newOrder.reserve_date = order.reserve_date;
      newOrder.seller_id = order.seller_id 
      newOrder.street = order.street 

   
   
    // newOrder.UserName = data.name;
    // newOrder.UserTel = data.tel;
    // //newOrder.Year = 2015;
    // newOrder.Date = data.day.day.date;
    // newOrder.Time = data.time.duration;
    // newOrder.City = data.city;
    // newOrder.Zone = data.zone;
    // newOrder.Address = data.detailAddress;
    //  newOrder.UserID = data.userID;


    console.log(newOrder);

	tableOrder.create(newOrder, function (err, vals) {
	    //mysql callback
	    if (err) {
	    	console.log("CREATE ERROR : " + err);
	    	return;
	    };
	       

	     console.log(vals); 
      res.sendStatus("Order Added");

	});

   
});


app.post('/NewAddress', function(req, res){
   
    var data = req.body;
    // console.log("below is the new Address \n");
    //console.log(data);
    var newAddress = {}; 

    newAddress.contacter_name = data.contacter_name;
    newAddress.contacter_phone = data.contacter_phone;
    newAddress.city_id = data.city_id;
    newAddress.region_id = data.region_id;
    newAddress.street = data.street;
    newAddress.customer_id = data.customer_id;
    newAddress.city_name = data.city_name;
    newAddress.region_name = data.region_name;


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

	tableOrder.load({'customer_id':userId},function(err,data){
          res.json(data);
	})

	
});


app.get('/GetUserAddress', function(req, res){
  var userId = Number(req.query.id);
  var userOrder;
  var userAddress = [];
  var events = require("events");
  var eventEmitter = new events.EventEmitter();
  var cityReady = false;
  var regionReady = false;

  console.log("userId is " + userId);

  tableAddress.load({'customer_id':userId},function (err,data){
         if (err) {
          console.log(err);
         } else{
             userAddress = data;
             eventEmitter.emit('INIT_ADDR_DONE',{addr:userAddress});
         };
  })

  eventEmitter.on('INIT_ADDR_DONE',function (eventData) {
    var userAddress = eventData.addr;
    var countCity = 0;
    var countRegion = 0;
    
    for (var i = 0; i < userAddress.length; i++) {
       tableCityName.load({'city_id':userAddress[i].city_id},function (err,city) {
            if (err) {
              console.log("city table error");
            } else{
              if(city.length === 1){
                eventEmitter.emit('GOT_CITY_NAME',{index:countCity,cityname:city[0].cityname});
                 countCity++;
                if (countCity === userAddress.length) {
                     console.log("get cityname successfully\n");
                     cityReady = true;
                     eventEmitter.emit('GET_CITY_NAME_DONE');
                 };
              }else{
                console.log("city duplicate error");
              }
          };
       })

       tableZoneName.load({'region_id':userAddress[i].region_id},function (err,region) {
            if (err) {
              console.log("region table error");
            } else{
              if(region.length === 1){
                eventEmitter.emit('GOT_REGION_NAME',{index:countRegion,regionname:region[0].regionname});
                 countRegion++;
                if (countRegion === userAddress.length) {
                     console.log("get regionname successfully\n");
                     regionReady = true;
                     eventEmitter.emit('GET_REGION_NAME_DONE');
                 };
              }else{
                console.log("region duplicate error");
              }
            };
       })
      
    };
 
  })

  

  eventEmitter.on('GOT_CITY_NAME',function (eventData) {
      var i = eventData.index;
      var cityname = eventData.cityname;
      if (i<userAddress.length) {
        userAddress[i].city_name = cityname;
      }
  })

  eventEmitter.on('GOT_REGION_NAME',function (eventData) {
      var i = eventData.index;
      var regionname = eventData.regionname;
      if (i<userAddress.length) {
        userAddress[i].region_name = regionname;
      }
  })

  eventEmitter.on('GET_CITY_NAME_DONE',function () {
    if (regionReady && cityReady) {
      console.log("final addr is\n");
      console.log(userAddress);
      res.json(userAddress);
    };
  })

  eventEmitter.on('GET_REGION_NAME_DONE',function () {
    if (regionReady && cityReady) {
      console.log("final addr is\n");
      console.log(userAddress);
      //res.sendStatus(userAddress);
      res.json(userAddress);
    };
  })

});


app.get('/GetCity', function(req, res){
  tableCityName.load({},function(err,data){
          console.log(data);
          res.json(data);
  })
});

app.get('/GetZone', function(req, res){
  var cityID = Number(req.query.id);
  tableZoneName.load({"city_id":cityID},function(err,data){
          console.log(data);
          // res.sendStatus(data);
           res.json(data);
  })
});

app.get('/addNewUser', function(req, res){
  console.log(req.query);
  var customer = {}; 
  var response = {}
  customer.customer_phone = Number(req.query.tel);
  customer.wechat_id = Number(req.query.wechat_id);
  tableCustomer.create(customer,function(err,data){
          if (err) {
            console.log(err);
          } else{
            console.log(data);
            response.result = 1;
            console.log(response);
            // res.sendStatus(response);
            res.json (response);
          };
         
  })

  
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
  
});



 
app.listen(3000);
console.log('listening to http://localhost:3000');