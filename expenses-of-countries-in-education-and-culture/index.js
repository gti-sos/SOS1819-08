var expenses=[];
module.exports= function(app){
    

//Felix LID
app.get("/api/v1/expenses-of-countries-in-education-and-culture/loadInitialData", (req, res) => {
    expenses.find({}).toArray((err, expArray)=>{
        if(err){
            console.error(err);
        }
        if(expArray.length==0){
        var newExpenses = [{
    "country": "USA",
    "year": 2017,
    "countryExpense": 658066.8,
    "budgetPercentage": 13.45,
    "expensePerCapita": 2006
}, {
    "country": "Spain",
    "year": 2017,
    "countryExpense": 46241.5,
    "budgetPercentage": 9.77,
    "expensePerCapita": 997
},{
    "country": "China",
    "year": 2017,
    "countryExpense": 19435.5,
    "budgetPercentage": 12.63,
    "expensePerCapita": 15
},{
    "country": "Germany",
    "year": 2017,
    "countryExpense": 658066.9,
    "budgetPercentage": 13.46,
    "expensePerCapita": 1.795
},{
    country: "Colombia",
    year: 2017,
    countryExpense: 12247.1,
    budgetPercentage: 9.78,
    expensePerCapita: 248
}];
expenses.insertMany(newExpenses);
      res.sendStatus(200);  }
      else{
          res.sendStatus(400);
      }
    });


});
//Felix docs
app.get("/api/v1/expenses-of-countries-in-education-and-culture/docs", (req, res) => {

    res.redirect('https://app.example.io');
});
    

// Felix get 
app.get("/api/v1/expenses-of-countries-in-education-and-culture/", (req, res) => {
    expenses.find({}).toArray((err, expensesArray)=>{
         if(err)
            console.log("Error: "+err);
        res.send(expensesArray);
    })
    
});
    
//Felix post
app.post("/api/v1/expenses-of-countries-in-education-and-culture", (req, res) => {
    var newExpense = req.body;
    var aux = false;
    if(newExpense.length > 5 || !newExpense.hasOwnProperty("country") || !newExpense.hasOwnProperty("year")
    || !newExpense.hasOwnProperty("countryExpense")|| !newExpense.hasOwnProperty("budgetPercentage")||
    !newExpense.hasOwnProperty("expensePerCapita")){
       console.log("datos: "+ newExpense);
        res.sendStatus(400);
    }
    expenses.find({ "country": newExpense.country, "year": newExpense.year }).toArray(( err, data) => {
         if(err==1){
             console.log("ERROR");
         }
          console.log("data" +data.country);
          console.log("country"+ newExpense.country);
          console.log("country 2 "+ newExpense["country"]);
          console.log("year 2 "+ newExpense["year"]);
            if (data.length!= 0) {
                aux = true;
                res.sendStatus(409);
                return;
            }else{
                expenses.insertOne(newExpense, (numUpdated) => {
                    
                    console.log("Insert: " + numUpdated);
                    res.sendStatus(201);
                });
            }
        });
});
// Felix delete 
app.delete("/api/v1/expenses-of-countries-in-education-and-culture", (req, res) => {
    expenses.remove();
    
    res.sendStatus(200);
});
//Felix get concreto
app.get("/api/v1/expenses-of-countries-in-education-and-culture/:country/:year", (req, res) => {
    var countryN = req.params.country;
    var yearN = parseInt(req.params.year);
    expenses.find({"country": countryN,"year": yearN}).toArray((err,expArray)=>{
        
        
        console.log(countryN+" "+yearN);
        console.log(expArray);
        if(err){
            console.log("Error: "+err);
        }
        if(expArray.length==0){
            res.sendStatus(404);
        }else{
        res.send(expArray);    
        }
                
    
});
});
//Felix PUT
app.put("/api/v1/expenses-of-countries-in-education-and-culture/:country/:year", (req, res) => {
   var country = req.params.country;
   var year = parseInt(req.params.year);
   
   
  
    var updateExpense = req.body;
    var country = req.params.country;
    
    if(country!= updateExpense.country|| year!= updateExpense.year|| !updateExpense.hasOwnProperty("country")||!updateExpense.hasOwnProperty("year")
    || !updateExpense.hasOwnProperty("countryExpense")|| !updateExpense.hasOwnProperty("budgetPercentage")||
    !updateExpense.hasOwnProperty("expensePerCapita")|| updateExpense.country == null|| updateExpense.year == null||updateExpense.countryExpense == null
    || updateExpense.budgetPercentage == null|| updateExpense.expensePerCapita == null){
       console.log(country);
       console.log(year)
        res.sendStatus(400);
    }else{
       expenses.find({"country": updateExpense.country, "year": parseInt(updateExpense.year) }).toArray((err,dataa)=>{
           if(err){
               console.log(err);
               
           }
           if(dataa.length==0){
               res.sendStatus(404);
           }else{
                expenses.update({"country": updateExpense.country, "year": parseInt(updateExpense.year) }, updateExpense, (err, numUpdated) => {
            console.log(updateExpense.country);
            console.log("Updated: " + numUpdated);
            });
        res.sendStatus(200);
           }
       });
        
    }
});
//Felix delete concreto 
app.delete("/api/v1/expenses-of-countries-in-education-and-culture/:country/:year", (req, res) => {
    var year = parseInt(req.params.year);
    var country = req.params.country;
     expenses.find({"country": country, "year":year }).toArray((err,dataa)=>{
           if(err){
               console.log(err);
               
           }
           if(dataa.length==0){
               res.sendStatus(404);
           }else{
   expenses.deleteOne({"country": country, "year": year});
    
    res.sendStatus(200);
           }
    

});
});

//Felix errores
app.post("/api/v1/expenses-of-countries-in-education-and-culture/:country/:year", (req, res) => {
    res.sendStatus(405);
});
//error 2
app.put("/api/v1/expenses-of-countries-in-education-and-culture", (req, res) => {
    res.sendStatus(405);
});
}