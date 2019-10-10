const express = require('express'); //express var
const app = express(); //app var
const http = require('http');
const port = 3000; // port
const hostname = '127.0.0.5'; // ip address
const parser = require('body-parser');
var request = require('request');

app.use(express.static(__dirname + '/')); // css style sheet
app.use(parser.urlencoded({extended: true})); // to get bodyParser. extended is true.

app.post('/', function(req, res){
var crypto = req.body.crypto; //requesting variables from page
var fiat = req.body.fiat; //requesting variables from page
var amount = req.body.amount; //requesting variables from page

var BaseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var finalURL = BaseURL + crypto + fiat;

request(finalURL, function (error, response, body) {
var data = JSON.parse(body);
var datex = data.display_timestamp;
var price = data.last;
var calcx = amount * price;

res.write("<h1>The current date is: " + datex); //gives output on page
res.write("<br>");
res.write(String("The current cost would be: " + calcx + "&nbsp;" + fiat)); //gives output on page


res.send();

}); // finished result
  });
app.listen(port, function(){
console.log("Application is running on port" + port);
});
