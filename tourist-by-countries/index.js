

var touristsByCountries = {};
var BASE_PATH = "/api/v1";





module.exports= function(app, touristsByCountries) {

    console.log("Registering routes for tourists API...");
    
    app.get(BASE_PATH + "/tourists-by-countries/docs", (req, res) => {
        console.log(Date() + " - GET /tourists-by-countries/docs");
        res.redirect("https://documenter.getpostman.com/view/6926249/S17xr5ZF");
    });


app.get(BASE_PATH+"/tourists-by-countries/loadInitialData", (req, res) => {
    
    
    touristsByCountries.find({}).toArray((errs, touristAux) => {
        if (errs) {
            console.error("Error accesing to datas: " + errs);
            //process.exit(1);
        }
        if (touristAux.length == 0) {

    var newTourist = [{
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
     touristsByCountries.insert(newTourist);
            console.log(Date() + " - GET /tourists-by-countries/loadInitialData - Created " + newTourist.length + " emigrations-by-countries");
        }
        else {
            console.log(Date() + " - GET /tourists-by-countries/loadInitialData - DB has " + touristAux.length + " emigrations-by-countries");
        }
    });
    res.sendStatus(200);
})





//GET / turists/

app.get(BASE_PATH +"/tourists-by-countries", (req, res) => {
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);
    touristsByCountries.find({}).skip(offSetAux).limit(limitAux).toArray((err, touristArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(touristArray.map((c) => {
            delete c._id;
            return c;
        }));
    });
});

//POST / turists/

app.post(BASE_PATH+"/tourists-by-countries", (req, res) => {
    var data = req.body;
    var auxiliar = false;
    //Comprobamos si hay incongruencias en los datos antes de actuar
    if (data.length > 8 || !data.hasOwnProperty("country") || !data.hasOwnProperty("year") || !data.hasOwnProperty("touristDeparture") ||
        !data.hasOwnProperty("arrivalTourist") || !data.hasOwnProperty("incomeTourist")) {
        res.sendStatus(400);
        return;
    }
    touristsByCountries.find({ "country": data["country"], "year": data["year"] }).toArray((err, datas) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        if (datas.length > 0) {
            auxiliar = true;
            res.sendStatus(409);
            return;
        }
        if (datas.length == 0) {
            touristsByCountries.insertOne(data, (err, numUpdated) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                console.log("Insert: " + numUpdated);
                res.sendStatus(201);
            });
        }
    });

});

//DELETE/ turists/
app.delete(BASE_PATH+"/tourists-by-countries", (req, res) => {

    touristsByCountries.remove();

    res.sendStatus(200);

});

//GET /turists/China

app.get(BASE_PATH+"/tourists-by-countries/:country", (req, res) => {

    var country = req.params.country;

    touristsByCountries.find({ country }).toArray((err, touristArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(touristArray);
    });


});


//PUT /turists/China


app.put(BASE_PATH+"/tourists-by-countries/:country/:year", (req, res) => {

    // var id1 = req.body.country;


    // var updateTourist = req.body;

    // var country = req.params.country;



    // var esta = touristsByCountries.find({ $set: { 'country': country } });

    // var newValues = { $set: updateTourist };
    // if (id1 != esta) {
    //     res.sendStatus(400);
    //     console.log("FALLO");
    // }
    // else {
    //     console.log("NO FALLO");
    //     touristsByCountries.updateOne({ "country": country }, newValues, { upsert: true });
    //     res.sendStatus(200);
    // }

var country = req.params.country;
var year = req.params.year;
var data = req.body;

console.log(data);
//Comprobamos si hay incongruencias en los datos antes de actuar


if (country != data.country || year != data.year) {
            res.sendStatus(400);
            console.warn(Date() + "Hacking attempt!");
            return;
        }

        else {
            touristsByCountries.update({ "province": data.province, "year": data.year }, data, (err, numUpdated) => {
                console.log("Updated: " + numUpdated);
                res.sendStatus(200);
            });
        }
    });


//DELETE/tourists-by-countries/China

app.delete(BASE_PATH+"/tourists-by-countries/:country/:year", (req, res) => {

    var country = req.params.country;


    var year = req.params.year;

    touristsByCountries.remove({ "country": country, "year": year });
    res.sendStatus(200);



});

//ERRORES

app.post(BASE_PATH+"/tourists-by-countries/:country", (req, res) => {
    res.sendStatus(405);
});

app.put(BASE_PATH+"/tourists-by-countries/", (req, res) => {

res.sendStatus(405);
});

app.put(BASE_PATH+"/tourists-by-countries/:year", (req, res) => {

res.sendStatus(405);
});

}
