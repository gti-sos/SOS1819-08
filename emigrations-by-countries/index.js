

module.exports = function(app, emigrations){
    
    app.get("/api/v1/emigrations-by-countries/docs", (req, res) => {
        console.log(Date() + " - GET /emigrations-by-countries/docs");
        res.redirect("https://documenter.getpostman.com/view/6913613/S17xt6g2");
    });
    
    //Cristian LID
app.get("/api/v1/emigrations-by-countries/loadInitialData", (req, res) => {
    emigrations.find({}).toArray((errs, emigrationsAux) => {
        if (errs) {
            console.error("Error accesing to datas: " + errs);
            //process.exit(1);
        }
        if (emigrationsAux.length == 0) {
            
            var newEmigrations = [{
                "country": "USA",
                "year": 2017,
                "emigrantman": 1527889,
                "emigrantwoman": 1488796,
                "totalemigrant": 3016685
            }, {
                "country": "Spain",
                "year": 2017,
                "emigrantman": 609615,
                "emigrantwoman": 736247,
                "totalemigrant": 1345862
            }, {
                "country": "China",
                "year": 2017,
                "emigrantman": 4589075,
                "emigrantwoman": 5372983,
                "totalemigrant": 9962058
            }, {
                "country": "Germany",
                "year": 2017,
                "emigrantman": 1934294,
                "emigrantwoman": 2273789,
                "totalemigrant": 4208083
            }, {
                "country": "Colombia",
                "year": 2017,
                "emigrantman": 1249848,
                "emigrantwoman": 1486382,
                "totalemigrant": 2736230
            }, {
                "country": "Uruguay",
                "year": 2017,
                "emigrantman": 1000,
                "emigrantwoman": 1050,
                "totalemigrant": 2050
            }];
            emigrations.insert(newEmigrations);
            res.sendStatus(200);

            console.log(Date() + " - GET /emigrations-by-countries/loadInitialData - Created " + newEmigrations.length + " emigrations-by-countries");
        }
        else {
            res.sendStatus(400)
            console.log(Date() + " - GET /emigrations-by-countries/loadInitialData - DB has " + emigrationsAux.length + " emigrations-by-countries");
        }
    });
})








//Cristian GET /emigrations-by-countries/
app.get("/api/v1/emigrations-by-countries", (req, res) => {
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);
    var search = {};
    if(req.query.country)  search["country"] = req.query.country;
    if(req.query.year){  search["year"] =  parseInt(req.query.year);
}else if(req.query.emigrantManFrom && req.query.emigrantManTo){
    search["emigrantman"] = {$gte : parseInt(req.query.emigrantManFrom), $lte: parseInt(req.query.emigrantManTo)};
}else if(req.query.emigrantWomanFrom && req.query.emigrantWomanTo){
    search["emigrantwoman"] = {$gte : parseInt(req.query.emigrantWomanFrom), $lte: parseInt(req.query.emigrantWomanTo)};
}else if(req.query.totalEmigrantFrom && req.query.totalEmigrantTo){
    search["totalemigrant"] = {$gte : parseInt(req.query.totalEmigrantFrom), $lte: parseInt(req.query.totalEmigrantTo)};
}
    emigrations.find(search).skip(offSetAux).limit(limitAux).toArray((err, emigrationsArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(emigrationsArray.map((c) => {
            delete c._id;
            return c;
        }));
    });
});

//Cristian POST /emigrations-by-countries/
app.post("/api/v1/emigrations-by-countries", (req, res) => {
    var newEmigrations = req.body;
    var auxiliar = false;

    if (!newEmigrations.hasOwnProperty("country") || !newEmigrations.hasOwnProperty("year") || !newEmigrations.hasOwnProperty("emigrantman") ||
        !newEmigrations.hasOwnProperty("emigrantwoman") || !newEmigrations.hasOwnProperty("totalemigrant") ||
        newEmigrations["country"] == null || newEmigrations["year"] == null || newEmigrations["emigrantman"] == null || newEmigrations["emigrantwoman"] == null ||
        newEmigrations["totalemigrant"] == null) {
        res.sendStatus(400);
        return;
    }

    emigrations.find({ "country": newEmigrations["country"], "year": newEmigrations["year"] }).toArray((err, datas) => {
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
            emigrations.insert(newEmigrations);

            res.sendStatus(201);

        }
    });


});

//Cristian DELETE /emigrations-by-countries/
app.delete("/api/v1/emigrations-by-countries", (req, res) => {

    emigrations.remove();

    res.sendStatus(200);
});


//Cristian GET /emigrations-by-countries/USA/2017

app.get("/api/v1/emigrations-by-countries/:country/:year", (req, res) => {
    var country = req.params.country;
    var year = parseInt(req.params.year);
    emigrations.find({ "country": country, "year": year }).toArray((err, emigrationsArray) => {
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

//Cristian GET /emigrations-by-countries/USA

app.get("/api/v1/emigrations-by-countries/:country", (req, res) => {
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);
    var country = req.params.country;

    emigrations.find({ "country": country }).skip(offSetAux).limit(limitAux).toArray((err, emigrationsArray) => {
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
        }));
    });
});



//Cristian PUT /emigrations-by-countries/USA

app.put("/api/v1/emigrations-by-countries/:country/:year", (req, res) => {

    var country = req.params.country;
    var year = parseInt(req.params.year);
    var updateEmigrations = req.body;
    if (country != updateEmigrations.country || year != parseInt(updateEmigrations.year) || !updateEmigrations.hasOwnProperty("year") || !updateEmigrations.hasOwnProperty("emigrantman") ||
        !updateEmigrations.hasOwnProperty("emigrantwoman") || !updateEmigrations.hasOwnProperty("totalemigrant") ||
        updateEmigrations["country"] == null || updateEmigrations["year"] == null || updateEmigrations["emigrantman"] == null || updateEmigrations["emigrantwoman"] == null ||
        updateEmigrations["totalemigrant"] == null) {
        res.sendStatus(400);
        return;
    }
    emigrations.update({ "country": country, "year": year }, updateEmigrations, { upsert: false });


    res.sendStatus(200);

});

//Cristian DELETE /emigrations-by-countries/USA/2017

app.delete("/api/v1/emigrations-by-countries/:country/:year", (req, res) => {

    var country = req.params.country;
    var year = parseInt(req.params.year);
    emigrations.remove({ 'country': country, 'year': year });
    res.sendStatus(200);

});

//Cristian POST a un recurso, metodo no permitido
app.post("/api/v1/emigrations-by-countries/:country", (req, res) => {

    res.sendStatus(405);
});

//Cristian POST a un recurso, metodo no permitido
app.post("/api/v1/emigrations-by-countries/:country/:year", (req, res) => {

    res.sendStatus(405);
});

//Cristian PUT a la ruta base, método no permitido
app.put("/api/v1/emigrations-by-countries", (req, res) => {

    res.sendStatus(405);
});

//Cristian PUT a la ruta base, método no permitido
app.put("/api/v1/emigrations-by-countries/:year", (req, res) => {

    res.sendStatus(405);
});
    
    
    
}