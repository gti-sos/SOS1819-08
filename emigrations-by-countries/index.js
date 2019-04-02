

module.exports = function(app, emigrations){
    
    app.get("/api/v1/emigrations-by-countries/docs", (req, res) => {
        console.log(Date() + " - GET /emigrations-by-countries/docs");
        res.redirect("");
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
                "emigrant-man": 1527889,
                "emigrant-woman": 1488796,
                "total-emigrant": 3016685
            }, {
                "country": "Spain",
                "year": 2017,
                "emigrant-man": 609615,
                "emigrant-woman": 736247,
                "total-emigrant": 1345862
            }, {
                "country": "China",
                "year": 2017,
                "emigrant-man": 4589075,
                "emigrant-woman": 5372983,
                "total-emigrant": 9962058
            }, {
                "country": "Germany",
                "year": 2017,
                "emigrant-man": 1934294,
                "emigrant-woman": 2273789,
                "total-emigrant": 4208083
            }, {
                "country": "Colombia",
                "year": 2017,
                "emigrant-man": 1249848,
                "emigrant-woman": 1486382,
                "total-emigrant": 2736230
            }];
            emigrations.insert(newEmigrations);
            console.log(Date() + " - GET /emigrations-by-countries/loadInitialData - Created " + newEmigrations.length + " emigrations-by-countries");
        }
        else {
            console.log(Date() + " - GET /emigrations-by-countries/loadInitialData - DB has " + emigrationsAux.length + " emigrations-by-countries");
        }
    });
    res.sendStatus(200);
})


//Cristian GET /emigrations-by-countries/
app.get("/api/v1/emigrations-by-countries", (req, res) => {
    var limitAux = parseInt(req.query.limit);
    var offSetAux = parseInt(req.query.offset);
    emigrations.find({}).skip(offSetAux).limit(limitAux).toArray((err, emigrationsArray) => {

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

    if (!newEmigrations.hasOwnProperty("country") || !newEmigrations.hasOwnProperty("year") || !newEmigrations.hasOwnProperty("emigrant-man") ||
        !newEmigrations.hasOwnProperty("emigrant-woman") || !newEmigrations.hasOwnProperty("total-emigrant") ||
        newEmigrations["country"] == null || newEmigrations["year"] == null || newEmigrations["emigrant-man"] == null || newEmigrations["emigrant-woman"] == null ||
        newEmigrations["total-emigrant"] == null) {
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
        }));
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
    if (country != updateEmigrations.country || year != parseInt(updateEmigrations.year) || !updateEmigrations.hasOwnProperty("year") || !updateEmigrations.hasOwnProperty("emigrant-man") ||
        !updateEmigrations.hasOwnProperty("emigrant-woman") || !updateEmigrations.hasOwnProperty("total-emigrant") ||
        updateEmigrations["country"] == null || updateEmigrations["year"] == null || updateEmigrations["emigrant-man"] == null || updateEmigrations["emigrant-woman"] == null ||
        updateEmigrations["total-emigrant"] == null) {
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

//Cristian PUT a la ruta base, método no permitido
app.put("/api/v1/emigrations-by-countries", (req, res) => {

    res.sendStatus(405);
});

//Cristian PUT a la ruta base, método no permitido
app.put("/api/v1/emigrations-by-countries/:year", (req, res) => {

    res.sendStatus(405);
});
    
    
    
}