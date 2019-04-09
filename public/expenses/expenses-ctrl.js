/*global angular*/

 angular.module("minipostmanAPP").controller("MainCtrl", ["$scope", "$http", function($scope, $http){
            console.log("MainCtrl initialized");
            $scope.url = "/api/v1/expenses-of-countries-in-education-and-culture";
            
            var path="https://sos1819-08.herokuapp.com"
            $scope.sendGet = function (){
                $http.get(path+$scope.url).then(function(response){
                $scope.data = JSON.stringify(response.data, null,2);
            });
            };
             $scope.sendPut = function (country, year, countryExpense, budgetPercentage, expensePerCapita){
                 if(typeof country!=='undefined'
        && typeof year!=='undefined'
        && typeof countryExpense!=='undefined'
        && typeof budgetPercentage!=='undefined'
        && typeof expensePerCapita!=='undefined'){
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
                 if(typeof country!=='undefined'
        && typeof year!=='undefined'
        && typeof countryExpense!=='undefined'
        && typeof budgetPercentage!=='undefined'
        && typeof expensePerCapita!=='undefined'){
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
                $scope.dataResponse = JSON.stringify(response.data,null,2);
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
            });
        }else{
            $scope.dataResponse="Fields required";
        }   
            
        };
         $scope.sendDelete = function(){
        $http.delete(path+$scope.url).then(function(response){
            console.log($scope.url);
            var res = JSON.stringify(response.data,null,2);
           
            $scope.dataResponse = res;
        }, function (response) {
            $scope.dataResponse=response.status+", "+response.statusText;
        });
    };
    $scope.postJson = function(){
                    $http.post(path+$scope.url,$scope.data).then(function(response){
                        $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                    }, function (response){
                      $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                        });
                    };
      $scope.putJson = function(){
                    $http.put(path+$scope.url,$scope.data).then(function(response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                        });
                    };

             }
             
            
        ] );