/*global angular*/

 angular.module("minipostmanAPP").controller("MainCtrl", ["$scope", "$http", function($scope, $http){
            console.log("MainCtrl initialized");
            $scope.url = "/api/v1/expenses-of-countries-in-education-and-culture";
            var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var path="https://sos1819-08.herokuapp.com"
           refresh();
            function refresh(){
                console.log("Requesting expenses to <"+API+">");
                $http.get(API).then(function(response) {
                    console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                })
            }
            

        
            
            $scope.sendGet = function (){
                $http.get(path+$scope.url).then(function(response){
                $scope.data = JSON.stringify(response.data, null,2);
            });
            };
             $scope.sendPut = function (country, year, countryExpense, budgetPercentage, expensePerCapita){
                 if((typeof country!=='undefined'
        && typeof year!=='undefined'
        && typeof countryExpense!=='undefined'
        && typeof budgetPercentage!=='undefined'
        && typeof expensePerCapita!=='undefined')||(country!==""
        &&  year!==""
        &&  countryExpense!==""
        && budgetPercentage!==""
        &&  expensePerCapita!=="")){
            var data = {
                country : country,
                year : parseInt(year)  ,
                countryExpense:parseFloat(countryExpense),
                budgetPercentage:parseFloat(budgetPercentage),
                expensePerCapita :parseFloat(expensePerCapita)
            };
            console.log("this is the new data:  " + data);
            $http.put(path+$scope.url, JSON.stringify(data)).then(function (response) {
                console.log("put done");
                $scope.dataResponse =" Code: "+response.status+"\n"+response.statusText;
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
            });
        }else{
            $scope.dataResponse="Fields required";
        }   
            
        };
        $scope.sendPost = function (country, year, countryExpense, budgetPercentage, expensePerCapita){
                 if((typeof country!=='undefined'
        && typeof year!=='undefined'
        && typeof countryExpense!=='undefined'
        && typeof budgetPercentage!=='undefined'
        && typeof expensePerCapita!=='undefined')||(country!==""
        &&  year!==""
        &&  countryExpense!==""
        && budgetPercentage!==""
        &&  expensePerCapita!=="")){
            var data = {
                country : country,
                year :parseInt(year)  ,
                 countryExpense:parseFloat(countryExpense),
                budgetPercentage:parseFloat(budgetPercentage),
                expensePerCapita :parseFloat(expensePerCapita)
            };
            console.log("this is the new data:  " + data);
            $http.post(path+$scope.url, JSON.stringify(data)).then(function (response) {
                console.log("post done");
                $scope.dataResponse = JSON.stringify(response.data,null,2)+"\n"+"Code: "+response.status;
            }, function (response) {
                console.log("Error POST method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
            });
        }else{
            $scope.dataResponse="Fields required";
        }   
          refresh();  
        };
         $scope.sendDelete = function(country, year){
        $http.delete(API+"/"+country+"/"+year).then(function(response){
            console.log("Deleting data :"+country+ " "+ year);
            var res = JSON.stringify(response.data,null,2);
           
           $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                      $scope.data = response.status;
                      refresh();
        }, function (response) {
          $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                      $scope.data = response.status;
                      refresh();
        });
        
    };
    $scope.postJson = function(){
                    $http.post(path+$scope.url,$scope.data).then(function(response){
                        $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                        $scope.data = response.status;
                    }, function (response){
                      $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                      $scope.data = response.status;
                        });
                    };
      $scope.putJson = function(){
                    $http.put(path+$scope.url,$scope.data).then(function(response){
                       $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                       $scope.data = response.status;
                    }, function (response){
                        $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                        $scope.data = response.status
                        });
                    };


        $scope.loadInitialData = function (){
                        $http.get("https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture/loadInitialData").then(function (response){
                            $scope.data = JSON.stringify(response.data,null,2) + response.status;
                             refresh();
                        }).catch(function (response) {
                            $scope.data = response.status;
                             refresh();
			            });
			           
             };
             $scope.clear = function(){
                 $scope.data="";
             };
             
             
             $scope.sendDeleteAll = function(){
        $http.delete(API).then(function(response){
            console.log("Deleting all data ");
            var res = JSON.stringify(response.data,null,2);
           
           $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                      $scope.data = response.status;
                      refresh();
        }, function (response) {
          $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                      $scope.data = response.status;
                      refresh();
        });
        
    };
             
            
       } ] );