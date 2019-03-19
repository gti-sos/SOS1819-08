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
app.use("/", express.static(__dirname+"/public"));

app.get("/time", (request, response)=> {
    response.send(new Date());
    
});
app.listen(port, () => {
    console.log("Magic is happening in port "+ port);
});