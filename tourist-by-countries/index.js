

var touristsByCountries = {};
var BASE_PATH = "/api/v1";





module.exports= function(app, touristsByCountries) {

    console.log("Registering routes for tourists API...");
    
    app.get(BASE_PATH + "/tourists-by-countries/docs", (req, res) => {
        console.log(Date() + " - GET /tourists-by-countries/docs");
        res.redirect("https://documenter.getpostman.com/view/6926249/S17xt6bi");
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
            res.sendStatus(200);
            console.log(Date() + " - GET /tourists-by-countries/loadInitialData - Created " + newTourist.length + " emigrations-by-countries");
        }
        else {
            console.log(Date() + " - GET /tourists-by-countries/loadInitialData - DB has " + touristAux.length + " emigrations-by-countries");
            res.sendStatus(400);
            
        }
    });
    
})





//GET / turists/

app.get(BASE_PATH +"/tourists-by-countries", (req, res) => {
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);
    
    
    
    
    
    var search = {};
    if(req.query.country)  search["country"] = req.query.country;
    if(req.query.year){  search["year"] =  parseInt(req.query.year);
}else if(req.query.from && req.query.to){ search["year"] = {$gte:parseInt(req.query.from),$lte:parseInt(req.query.to)};
    
}else if(req.query.touristDepartureFrom && req.query.touristDepartureTo){ search["touristDeparture"] = {$gte:parseInt(req.query.touristDepartureFrom),$lte:parseInt(req.query.touristDepartureTo)};
    
}else if(req.query.arrivalTouristFrom && req.query.arrivalTouristTo){ search["arrivalTourist"] = {$gte:parseInt(req.query.arrivalTouristFrom),$lte:parseInt(req.query.arrivalTouristTo)};
    
}else if(req.query.incomeTouristFrom && req.query.incomeTouristTo){ search["incomeTourist"] = {$gte:parseInt(req.query.incomeTouristFrom),$lte:parseInt(req.query.incomeTouristTo)};
    
}

    
    touristsByCountries.find(search).skip(offSetAux).limit(limitAux).toArray((err, touristArray) => {

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
    if (data.length > 5 || !data.hasOwnProperty("country") || !data.hasOwnProperty("year") || !data.hasOwnProperty("touristDeparture") ||
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

app.get(BASE_PATH+"/tourists-by-countries/:country/:year", (req, res) => {

    var country = req.params.country;
    var year = parseInt(req.params.year);

    
    touristsByCountries.find({ "country": country, "year": year }).toArray((err, emigrationsArray) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        if (emigrationsArray.length == 0) {
            res.sendStatus(404);
            return;
        }

        res.send(emigrationsArray.map((c) => {
            delete c._id;
            return c;
        })[0]);
    });

});


//PUT /turists/China


// 
    
    
    
    app.put("/api/v1/tourists-by-countries/:country/:year", (req, res) => {

    var country = req.params.country;
    var year = parseInt(req.params.year);
    var updateTourist = req.body;
    if (country != updateTourist.country || year != parseInt(updateTourist.year) || !updateTourist.hasOwnProperty("year") || !updateTourist.hasOwnProperty("touristDeparture") ||
        !updateTourist.hasOwnProperty("arrivalTourist") || !updateTourist.hasOwnProperty("incomeTourist") ||
        updateTourist["country"] == null || updateTourist["year"] == null || updateTourist["touristDeparture"] == null || updateTourist["arrivalTourist"] == null ||
        updateTourist["incomeTourist"] == null) {
        res.sendStatus(400);
        return;
    }
    touristsByCountries.update({ "country": country, "year": year }, updateTourist, { upsert: false });


    res.sendStatus(200);

});


//DELETE/tourists-by-countries/China

app.delete(BASE_PATH+"/tourists-by-countries/:country/:year", (req, res) => {

    var year = parseInt(req.params.year);
    var country = req.params.country;
    touristsByCountries.find({"country": country, "year":year }).toArray((err,dataa)=>{
           if(err){
               console.log(err);
               
           }
           if(dataa.length==0){
               res.sendStatus(404);
           }else{
            touristsByCountries.deleteOne({"country": country, "year": year});
    
            res.sendStatus(200);
           }
});

});

//ERRORES

app.post(BASE_PATH+"/tourists-by-countries/:country/:year", (req, res) => {
    res.sendStatus(405);
});

app.put(BASE_PATH+"/tourists-by-countries/", (req, res) => {

res.sendStatus(405);
});

app.put(BASE_PATH+"/tourists-by-countries/:year", (req, res) => {

res.sendStatus(405);
});

}
