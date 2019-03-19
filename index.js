var express = require("express");
var bodyParser= require("body-parser");
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json())

var expenses = [{
    country: "USA",
    year: "2017",
    countryExpense: "658066.8",
    budgetPercentage: "13.45",
    expensePerCapita: "2006"},{
        country: "Spain",
    year: "2017",
    countryExpense: "46241.5",
    budgetPercentage: "9.77",
    expensePerCapita: "997"}];
    
    // Felix get 
    app.get("/expenses-of-countries-in-education-and-culture", (req,res)=>{
        res.send(expenses);
    });
    //Felix post
     app.post("/expenses-of-countries-in-education-and-culture", (req,res)=>{
        var newExpense =req.body;
        
        expenses.push(newExpense);
        res.sendStatus(201);
    });
    // Felix delete 
     app.delete("/expenses-of-countries-in-education-and-culture", (req,res)=>{
        expenses=[];
        res.sendStatus(200);
    });
    //Felix get concreto
     app.get("/expenses-of-countries-in-education-and-culture/:country", (req,res)=>{
        var country = req.params.country;
        var filteredExpenses = expenses.filter((c)=>{
            return c.country==country;
        });
        if(filteredExpenses.length>=1){
            res.send(filteredExpenses[0]);
        }else{
            res.sendStatus(404);
        }
        
    });
    //Felix PUT
     app.put("/expenses-of-countries-in-education-and-culture/:country", (req,res)=>{
        var updateExpense = req.body;
        var found =false;
        var country = req.params.country;
        var updateExpenses =  expenses.map((c)=>{
            if(c.country == country){
                found=true;
                return updateExpense;
            }else{
                return c;
            }
        });
        
        if(found==false){
            res.sendStatus(404);
            
        }else{
             res.sendStatus(200);
            expenses=updateExpenses;
        }
        
    });
    //Felix delete concreto 
     app.delete("/expenses-of-countries-in-education-and-culture/:country", (req,res)=>{
        
        var found =false;
        var country = req.params.country;
        var updateExpenses =  expenses.filter((c)=>{
            if(c.country==country){
                found = true;
            
            return c.country != country;
        }});
        
        if(found==false){
            res.sendStatus(404);
            
        }else{
             res.sendStatus(200);
            expenses=updateExpenses;
        }
        
    });
    
    //Felix errores
    app.post("/expenses-of-countries-in-education-and-culture/:country", (req, res)=>{
        res.sendStatus(405);
    });
    //error 2
    app.put("/expenses-of-countries-in-education-and-culture", (req, res)=>{
        res.sendStatus(405);
    });
    
//Cristian    
var emigrations = [{
    country: "USA",
    year: "2017",
    emigrantMan: "1527889",
    emigrantWoman: "1488796",
    totalEmigrant: "3016685"
},{
    country: "Spain",
    year: "2017",
    emigrantMan: "609615",
    emigrantWoman: "736247",
    totalEmigrant: "1345862"
},{
    country: "China",
    year: "2017",
    emigrantMan: "4589075",
    emigrantWoman: "5372983",
    totalEmigrant: "9962058"
},{
    country: "Germany",
    year: "2017",
    emigrantMan: "1934294",
    emigrantWoman: "2273789",
    totalEmigrant: "4208083"
},{
    country: "Colombia",
    year: "2017",
    emigrantMan: "1249848	",
    emigrantWoman: "1486382",
    totalEmigrant: "2736230"
},];

//Cristian GET /emigrations-by-countries/
app.get("/emigrations-by-countries", (req,res) =>{
    res.send(emigrations);
});

//Cristian POST /emigrations-by-countries/
app.post("/emigrations-by-countries", (req,res) =>{
    var newEmigrations =req.body;
    
    emigrations.push(newEmigrations);
    
    res.sendStatus(201);
});

//Cristian DELETE /emigrations-by-countries/
app.delete("/emigrations-by-countries", (req,res) =>{

    emigrations = [];
    
    res.sendStatus(200);
});


//Cristian GET /emigrations-by-countries/USA

app.get("/emigrations-by-countries/:country", (req,res) =>{

    var country = req.params.country;
    
    var filteredEmigrations = emigrations.filter((c) =>{
        return c.country == country;
    });
    
    if (filteredEmigrations.length >= 1){
        res.send(filteredEmigrations[0]);
    }else{
            res.sendStatus(404);

    }
    
});

//Cristian PUT /emigrations-by-countries/USA

app.put("/emigrations-by-countries/:country", (req,res) =>{

    var country = req.params.country;
    var updateEmigrations = req.body;
    var found = false;
    
    var updateEmigration = emigrations.map((c) =>{
        
        if(c.country == country){
            found = true;
            return updateEmigrations;
        }else{
            return c;
        }
        
    });
    
    
    
    if (found == false){
            res.sendStatus(404);
    }else{
        emigrations=updateEmigration;
        res.sendStatus(200);
    }
    
});

//Cristian DELETE /emigrations-by-countries/USA

app.delete("/emigrations-by-countries/:country", (req,res) =>{

    var country = req.params.country;
    var found = false;
    
    var updateEmigrations = emigrations.filter((c) =>{
         if(c.country == country)
            found = true;
            return c.country != country;
         
    });
    
    
    
    if (found == false){
            res.sendStatus(404);
    }else{
        emigrations=updateEmigrations;
        res.sendStatus(200);
    }
    
});

//Cristian POST a un recurso, metodo no permitido
app.post("/emigrations-by-countries/:country", (req,res) =>{
    
    res.sendStatus(405);
});

//Cristian PUT a la ruta base, método no permitido
app.put("/emigrations-by-countries", (req,res) =>{
    
    res.sendStatus(405);
});

///------------------------------------PARTE MARIA DOLORES LÓPEZ------------------


var turists = [{
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



//GET / turists/

app.get("/turists", (req, res) => {
    res.send(turists);
});

//POST / turists/

app.post("/turists", (req, res) => {
    var newContact = req.body;

    turists.push(newContact);
    res.sendStatus(201);

});

//DELETE/ turists/
app.delete("/turists", (req, res) => {

    turists = [];

    res.sendStatus(200);

});

//GET /turists/China

app.get("/turists/:country", (req, res) => {

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


app.put("/turists/:country", (req, res) => {

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


//DELETE/turist/China

app.delete("/turists/:country", (req, res) => {

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

app.post("/turists/:country", (req, res) => {
    res.sendStatus(405);
});

app.put("/turists", (req, res) => {
    res.sendStatus(405);
});


app.listen(port, () => {
    console.log("Super server ready on port" + port);
});


app.use("/", express.static(__dirname+"/public"));

app.get("/time", (request, response)=> {
    response.send(new Date());
    
});
app.listen(port, () => {
    console.log("Magic is happening in port "+ port);
});