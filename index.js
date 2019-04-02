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

//Cristian LID
app.get("/api/v1/emigrations-by-countries/loadInitialData", (req, res) => {
var newEmigrations = [{
    country: "USA",
    year: 2017,
    emigrantMan: 1527889,
    emigrantWoman: 1488796,
    totalEmigrant: 3016685
}, {
    country: "Spain",
    year: 2017,
    emigrantMan: 609615,
    emigrantWoman: 736247,
    totalEmigrant: 1345862
}, {
    country: "China",
    year: 2017,
    emigrantMan: 4589075,
    emigrantWoman: 5372983,
    totalEmigrant: 9962058
}, {
    country: "Germany",
    year: 2017,
    emigrantMan: 1934294,
    emigrantWoman: 2273789,
    totalEmigrant: 4208083
}, {
    country: "Colombia",
    year: 2017,
    emigrantMan: 1249848,
    emigrantWoman: 1486382,
    totalEmigrant: 2736230
}];
    emigrations= newEmigrations;
    res.sendStatus(200);
});

//Cristian GET /emigrations-by-countries/
app.get("/api/v1/emigrations-by-countries", (req, res) => {
    res.send(emigrations);
});

//Cristian POST /emigrations-by-countries/
app.post("/api/v1/emigrations-by-countries", (req, res) => {
    var newEmigrations = req.body;

    emigrations.push(newEmigrations);

    res.sendStatus(201);
});

//Cristian DELETE /emigrations-by-countries/
app.delete("/api/v1/emigrations-by-countries", (req, res) => {

    emigrations = [];

    res.sendStatus(200);
});


//Cristian GET /emigrations-by-countries/USA

app.get("/api/v1/emigrations-by-countries/:country", (req, res) => {

    var country = req.params.country;

    var filteredEmigrations = emigrations.filter((c) => {
        return c.country == country;
    });

    if (filteredEmigrations.length >= 1) {
        res.send(filteredEmigrations[0]);
    }
    else {
        res.sendStatus(404);

    }

});

//Cristian PUT /emigrations-by-countries/USA

app.put("/api/v1/emigrations-by-countries/:country", (req, res) => {

    var country = req.params.country;
    var updateEmigrations = req.body;
    var found = false;

    var updateEmigration = emigrations.map((c) => {

        if (c.country == country) {
            found = true;
            return updateEmigrations;
        }
        else {
            return c;
        }

    });



    if (found == false) {
        res.sendStatus(404);
    }
    else {
        emigrations = updateEmigration;
        res.sendStatus(200);
    }

});

//Cristian DELETE /emigrations-by-countries/USA

app.delete("/api/v1/emigrations-by-countries/:country", (req, res) => {

    var country = req.params.country;
    var found = false;

    var updateEmigrations = emigrations.filter((c) => {
        if (c.country == country)
            found = true;
        return c.country != country;

    });



    if (found == false) {
        res.sendStatus(404);
    }
    else {
        emigrations = updateEmigrations;
        res.sendStatus(200);
    }

});

//Cristian POST a un recurso, metodo no permitido
app.post("/api/v1/emigrations-by-countries/:country", (req, res) => {

    res.sendStatus(405);
});

//Cristian PUT a la ruta base, método no permitido
app.put("/api/v1/emigrations-by-countries", (req, res) => {

    res.sendStatus(405);
});

///------------------------------------PARTE MARIA DOLORES LÓPEZ------------------

app.get("/api/v1/tourists-by-countries/loadInitialData", (req, res) => {

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
] ;
 turists=newTurist;
     res.sendStatus(200);
   
});



//GET / turists/

app.get("/api/v1/tourists-by-countries", (req, res) => {
    res.send(turists);
});

//POST / turists/

app.post("/api/v1/tourists-by-countries", (req, res) => {
    var newContact = req.body;

    turists.push(newContact);
    res.sendStatus(201);

});

//DELETE/ turists/
app.delete("/api/v1/tourists-by-countries", (req, res) => {

    turists = [];

    res.sendStatus(200);

});

//GET /turists/China

app.get("/api/v1/tourists-by-countries/:country", (req, res) => {

    var country = req.params.country;

    var filteredTurist = turists.filter((c) => {
        return c.country == country;
    })

    if (filteredTurist.length >= 1) {
        res.send(filteredTurist[0]);
    }
    else {
        res.sendStatus(404);
    }


});


//PUT /turists/China


app.put("/api/v1/tourists-by-countries/:country", (req, res) => {

    var country = req.params.country;
    var updatedTurist = req.body;
    var found = false;


    var updatedTurist = turists.map((c) => {

        if (c.country == country) {
            found = true;
            return updatedTurist;
        }
        else {
            return c;
        }
    });



    if (found == false) {
        res.sendStatus(404);
    }
    else {
        turists = updatedTurist;
        res.sendStatus(200);
    }


});


//DELETE/tourists-by-countries/China

app.delete("/api/v1/tourists-by-countries/:country", (req, res) => {

    var country = req.params.country;

    var found = false;


    var updatedTurist = turists.filter((c) => {

        if (c.country == country)
            found = true;
        return c.country != country;

    });



    if (found == false) {
        res.sendStatus(404);
    }
    else {
        turists = updatedTurist;
        res.sendStatus(200);
    }


});

//ERRORES

app.post("/api/v1/tourists-by-countries/:country", (req, res) => {
    res.sendStatus(405);
});

app.put("/api/v1/tourists-by-countries", (req, res) => {
    res.sendStatus(405);
});


app.listen(port, () => {
    console.log("Super server ready on port" + port);
});

app.use("/", express.static(__dirname + "/public"));