var express = require("express");
var expenses = require("./expenses-of-countries-in-education-and-culture");


//Felix mongodb
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos1819-08-lynix.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  expenses= client.db("sos1819-08").collection("expenses-of-countries-in-education-and-culture");
  // perform actions on the collection object
  console.log("mongo connected");
  
});


var expenses=[];


var bodyParser = require("body-parser");
var emigrations=[];
var app = express();

var turists=[];
var port = process.env.PORT || 8080;

app.use(bodyParser.json())





app.listen(port, () => {
    console.log("Super server ready on port" + port);
});

app.use("/", express.static(__dirname + "/public"));