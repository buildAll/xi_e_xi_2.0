// var http = require('http');
// http.createServer(function (req,res) {
// 	// res.end("hello world!\n");
// }).listen(3000);
// console.log("server running");





var express = require('express');
var app = express();
var bodyParser = require('body-parser')
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.post('/ReceiveJSON', function(req, res){
  console.log(req.body);
    res.send("ok");
});
 
app.listen(3000);
console.log('listening to http://localhost:3000');