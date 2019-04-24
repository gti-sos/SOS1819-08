/*global angular*/

 angular.module("minipostmanAPP").controller("MainCtrl", ["$scope", "$http", function($scope, $http){
            console.log("MainCtrl initialized");
            $scope.url = "/api/v1/expenses-of-countries-in-education-and-culture";
            var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
            var path="https://sos1819-08.herokuapp.com"
           refresh();
            function refresh(){
                console.log("Requesting expenses to <"+API+">");
                $http.get(API+"?limit="+10+"&offset="+pag).then(function(response) {
                    console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                })
            }
            

        
            
            $scope.sendGet = function (Fcountry, Fyear, FcountryExpenseMin, FcountryExpenseMax, FbudgetPercentageMin,  FbudgetPercentageMax, FexpensePerCapitaMin, FexpensePerCapitaMax){
                if(typeof Fcountry=='undefined'){
                    Fcountry="";
                }
                if(typeof Fyear=='undefined'){
                    Fyear="";
                }
                if(typeof FcountryExpenseMin=='undefined'){
                    FcountryExpenseMin="";
                }
                if(typeof FcountryExpenseMax=='undefined'){
                    FcountryExpenseMax="";
                }
                if(typeof FbudgetPercentageMin=='undefined'){
                    FbudgetPercentageMin="";
                }
                if(typeof FbudgetPercentageMax=='undefined'){
                    FbudgetPercentageMax="";
                }
                if(typeof FexpensePerCapitaMin=='undefined'){
                    FexpensePerCapitaMin="";
                }
                if(typeof FexpensePerCapitaMax=='undefined'){
                    FexpensePerCapitaMax="";
                }
                $http.get(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag).then(function(response){
            console.log(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag);
                $scope.expenses =response.data;
                
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
            $http.put(API+"/"+country+"/"+year, JSON.stringify(data)).then(function (response) {
                console.log("put done");
                $scope.dataResponse =" Code: "+response.status+"\n"+response.statusText;
                refresh();
            }, function (response) {
                console.log("Error PUT method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                refresh();
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
        && typeof expensePerCapita!=='undefined')/*||(country!==""
        &&  year!==""
        &&  countryExpense!==""
        && budgetPercentage!==""
        &&  expensePerCapita!=="")*/){
            var data = {
                country : country,
                year :parseInt(year)  ,
                 countryExpense:parseFloat(countryExpense),
                budgetPercentage:parseFloat(budgetPercentage),
                expensePerCapita :parseFloat(expensePerCapita)
            };
            console.log("this is the new data:  " +JSON.stringify( data));
            $http.post(API, JSON.stringify(data)).then(function (response) {
                console.log("post done");
                $scope.dataResponse = JSON.stringify(response.data,null,2)+"\n"+"Code: "+response.status;
                 refresh();
            }, function (response) {
                console.log("Error POST method: Code "+response.status+", "+response.statusText);
                $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                 refresh();
            });
        }else{
            $scope.dataResponse="Fields required";
        }   
           
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
                            $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                             refresh();
                        }).catch(function (response) {
                            $scope.data = response.status;
                            $scope.dataResponse="Code: "+response.status+"\n"+response.statusText;
                             refresh();
			            });
			           
             };
             $scope.clear = function(){
                 $scope.data="";
             };
             var Fcountry="";
             var  FyearW;
             var FcountryExpenseMin;
             
           var   FcountryExpenseMax;
            var   FbudgetPercentageMax;
            var   FbudgetPercentageMin;
            var   FexpensePerCapitaMax;
            var   FexpensePerCapitaMin;
              $scope.limpiar = function(Fcountry, Fyear, FcountryExpenseMin, FcountryExpenseMax, FbudgetPercentageMin,  FbudgetPercentageMax, FexpensePerCapitaMin, FexpensePerCapitaMax){
               Fcountry="",
               Fyear="",
               FcountryExpenseMin="",
               FcountryExpenseMax="",
               FbudgetPercentageMax="",
               FbudgetPercentageMin="",
               FexpensePerCapitaMax="",
               FexpensePerCapitaMin="";
               
                  $http.get(API+"?limit="+10+"&offset="+pag);
               
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
    
    var pag=0;
             var numero;
             $scope.Pagination=function(Fcountry, Fyear, FcountryExpenseMin, FcountryExpenseMax, FbudgetPercentageMin,  FbudgetPercentageMax, FexpensePerCapitaMin, FexpensePerCapitaMax,num){
                 numero=num;
                 if(typeof Fcountry=='undefined'){
                    Fcountry="";
                }
                if(typeof Fyear=='undefined'){
                    Fyear="";
                }
                if(typeof FcountryExpenseMin=='undefined'){
                    FcountryExpenseMin="";
                }
                if(typeof FcountryExpenseMax=='undefined'){
                    FcountryExpenseMax="";
                }
                if(typeof FbudgetPercentageMin=='undefined'){
                    FbudgetPercentageMin="";
                }
                if(typeof FbudgetPercentageMax=='undefined'){
                    FbudgetPercentageMax="";
                }
                if(typeof FexpensePerCapitaMin=='undefined'){
                    FexpensePerCapitaMin="";
                }
                if(typeof FexpensePerCapitaMax=='undefined'){
                    FexpensePerCapitaMax="";
                }
                  
               if(num==1){
                    pag=pag-10;
                    if(pag<0){
                            pag=0;
                            $http.get(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag).then(function (response){
                            $scope.expenses = response.data;
                            console.log("pagination1")
                            console.log(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag);
                             numero=num;
                             console.log(numero);
                             
                            });
                           
                    }else{
                        $http.get(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag).then(function (response){
                $scope.expenses = response.data;
                  console.log("pagination2")
                  console.log(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag);
                   numero=num;
                    console.log(numero);
                });
                    }
               }else{
                  
                pag=pag+10;
                $http.get( API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag).then(function (response){
                $scope.expenses = response.data;
                 console.log("pagination3")
                 console.log(API+ "?country="+Fcountry+"&year="+Fyear+"&countryExpenseMin="+FcountryExpenseMin+"&countryExpenseMax="+FcountryExpenseMax+"&percentageMin="+FbudgetPercentageMin+
                "&.percentageMax="+FbudgetPercentageMax+"&EPCMin="+FexpensePerCapitaMin+"&EPCMax="+FexpensePerCapitaMax+"&limit="+10+"&offset="+pag);
                  numero=num;
                   console.log(numero);
               });
               
                 
             }
            }
             
            
       } ] );