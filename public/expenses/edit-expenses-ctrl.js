/* global angular */

    angular
        .module("app")
        .controller("EditCtrl-expense",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("Edit Controller initialized.");
         var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var path="https://sos1819-08.herokuapp.com";


            var country = $routeParams.country;
            var year = $routeParams.year;
            
            console.log("Requesting expense <"+API+"/"+country+"/"+year+">...");
            
            $http.get(API+"/"+country+"/"+year).then(function (response){
                console.log("Data Received: "
                                + JSON.stringify(response.data,null,2));
    
                $scope.expense = response.data;
            });
             $scope.sendPut = function (country, year, countryExpense, budgetPercentage, expensePerCapita){
                 if((typeof country!=='undefined'
        && typeof year!=='undefined'
        && typeof countryExpense!=='undefined'
        && typeof budgetPercentage!=='undefined'
        && typeof expensePerCapita!=='undefined'
        &&  country !==null
        &&  year!==null)/*||(country!==""
        &&  year!==""
        &&  countryExpense!==""
        && budgetPercentage!==""
        &&  expensePerCapita!=="")*/){
            var data = {
                country : country,
                year : parseInt(year)  ,
                countryExpense:parseFloat(countryExpense),
                budgetPercentage:parseFloat(budgetPercentage),
                expensePerCapita :parseFloat(expensePerCapita)
            };
            console.log("this is the new data:  " + data);
            $http.put(API+"/"+country+"/"+year, JSON.stringify(data)).then(function (response) {
                console.log("put done");
                $scope.dataResponse ="Modificado ";
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
               
                      
                      $scope.dataResponse="no se ha encontrado " + country +" "+ year;
                      
            });
        }else{
            $scope.dataResponse="Fields required";
        }   
            
        };
            
           
            
        }]);    