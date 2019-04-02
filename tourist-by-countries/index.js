

var touristsByCountries = {};
var BASE_PATH = "/api/v1";





module.exports= function(app, touristsByCountries) {

    console.log("Registering routes for tourists API...");
    
    app.get(BASE_PATH + "/tourists-by-countries/docs", (req, res) => {
        console.log(Date() + " - GET /tourists-by-countries/docs");
        res.redirect("https://documenter.getpostman.com/view/6926249/S17xr5ZF");
    });






//GET / turists/

app.get(BASE_PATH +"/tourists-by-countries", (req, res) => {
    touristsByCountries.find({}).toArray((err, touristArray) => {

        if (err)
            console.log("Error: " + err);

        res.send(touristArray);
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


}
