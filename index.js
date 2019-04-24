var express = require("express");
var path = require("path");

var expensesCountries = require("./expenses-of-countries-in-education-and-culture");
var emigrationsByCountries = require("./emigrations-by-countries");
var tourist = require("./tourist-by-countries");

var expenses = [];
var touristsByCountries = [];
var emigrations = [];

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@cluster0-xtof2.mongodb.net/emigrations-by-countries?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

/////##############CONEXIONES MONGODB #####################//

client.connect(err => {
    emigrations = client.db("emigrations-by-countries").collection("paises");
    console.log("Connected!");
    emigrationsByCountries(app, emigrations);

    const MongoClient2 = require("mongodb").MongoClient;
    const uri2 = "mongodb+srv://test:test@sos1819-08-lynix.mongodb.net/test?retryWrites=true";
    const client2 = new MongoClient(uri2, { useNewUrlParser: true });

    client2.connect(err => {
        expenses = client2.db("sos1819-08").collection("expenses-of-countries-in-education-and-culture");
        console.log("mongo connected");
        expensesCountries(app, expenses);

        const MongoClient3 = require("mongodb").MongoClient;
        const uri3 = "mongodb+srv://test:test@practica-exo8m.mongodb.net/practica?retryWrites=true";
        const client3 = new MongoClient(uri3, { useNewUrlParser: true });

        client3.connect(err => {
            touristsByCountries = client3.db("practica").collection("touristsByCountries");
            console.log("mongo connected");
            tourist(app, touristsByCountries);

            app.listen(port, () => {
                console.log("Super server ready on port" + port);
            })
        });
    })
});


//Felix mongodb
// const MongoClient = require("mongodb").MongoClient;
// const uri = "mongodb+srv://test:test@sos1819-08-lynix.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   expenses= client.db("sos1819-08").collection("expenses-of-countries-in-education-and-culture");
//   // perform actions on the collection object
//   console.log("mongo connected");

// });


var bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json())



app.use("/", express.static(path.join(__dirname, "public"))); //conexion index.html principal


app.use("/api/v1/minipostman-expenses", express.static(__dirname + "/public/expenses/minipostman.html"));
app.use("/ui/v1/expenses-of-countries-in-education-and-culture", express.static(__dirname + "/public/expenses"));

app.use("/api/v1/minipostman-emigration", express.static(__dirname + "/public/emigration"));
app.use("/ui/v1/emigrations-by-countries", express.static(__dirname + "/public/emigration/emigrationapp"));


app.use("/api/v1/minipostman-tourist", express.static(path.join(__dirname + "/public/tourists/minipostman")));  //conexion index.html tourist
app.use("/ui/v1/tourists-by-countries", express.static(path.join(__dirname + "/public/tourists")));