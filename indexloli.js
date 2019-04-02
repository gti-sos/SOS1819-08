var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;

var touristsByCountries = require("./tourist-by-countries");

var port = (process.env.PORT || 1994);


var mdbURLTouristsByCountries = "mongodb+srv://test:test@practica-exo8m.mongodb.net/practica?retryWrites=true";

var app = express();
app.use(bodyParser.json());

var BASE_PATH = "/api/v1";


MongoClient.connect(mdbURLTouristsByCountries, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB: " + err);
        process.exit(1);
    }
    console.log("Connected to db in mlabs");

    var database = mlabs.db("practica");
    var db = database.collection("touristsByCountries");

        db.find({}).toArray((errs, touristAux) => {
        if (errs) {
            console.error("Error accesing to datas: " + errs);
            //process.exit(1);
        }
        if (touristAux.length == 0) {
            console.log("Empty DB");
            db.insert(touristsByCountries);
        }
        else {
            console.log("DB has " + touristAux.length + " graduation rates");
        }
    });

    app.get(BASE_PATH + "/tourists-by-countries/loadInitialData", (req, res) => {
        console.log(Date() + " - GET /tourists-by-countries/loadInitialData");
        db.find({}).toArray((errs, touristAux) => {
            if (errs) {
                console.error("Error accesing to datas: " + errs);
            }
            if (touristAux.length == 0) {
                console.log(Date() + " - GET /mtourists-by-countries/loadInitialData - Empty DB");

                var newTurist = [{
                        country: "Spain",
                        year: 2017,
                        touristDeparture: 17031.00,
                        arrivalTourist: 81786.00,
                        incomeTourist: 67964000
                    },
                    {
                        country: "China",
                        year: 2017,
                        touristDeparture: 43035.00,
                        arrivalTourist: 60740.00,
                        incomeTourist: 32617000
                    },
                    {
                        country: "USA",
                        year: 2017,
                        touristDeparture: 87703.00,
                        arrivalTourist: 76941.00,
                        incomeTourist: 210747000
                    },
                    {
                        country: "Germany",
                        year: 2017,
                        touristDeparture: 92402.00,
                        arrivalTourist: 37452.00,
                        incomeTourist: 39823000
                    },
                    {
                        country: "Colombia",
                        year: 2017,
                        touristDeparture: 4017.00,
                        arrivalTourist: 4027.00,
                        incomeTourist: 4821000
                    }
                ];
                db.insert(newTurist);
                console.log(Date() + " - GET /unemployment-rates/loadInitialData - Created " + touristsByCountries.length + " unemployment rates");
            }
            else {
                console.log(Date() + " - GET /unemployment-rates/loadInitialData - DB has " + touristsByCountries.length + " unemployment rates");
            }
        });
        res.sendStatus(200);
    });


    touristsByCountries.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });

});

