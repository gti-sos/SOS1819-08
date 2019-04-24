           /* global angular $scope*/

           angular
               .module("TouristsApp")
               .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
                   console.log("Tourists Initialized!");


                   var API = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries";
                   refresh();

                   function refresh() {
                       console.log("Requesting contacts to <" + API + ">...");
                       $http.get(API).then(function(response) {
                           console.log("Data Recieved: " + JSON.stringify(response.data, null, 2));
                           $scope.touristsByCountries = response.data;

                       });
                   };


                   $scope.sendGet = function(Fcountry, Fyear, FincomeTouristMin, FincomeTouristMax, FarrivalTouristMin, FarrivalTouristMax, FdepartureTouristMin, FdepartureTouristMax) {
                       if (typeof Fcountry == 'undefined') {
                           Fcountry = "";
                       }
                       if (typeof Fyear == 'undefined') {
                           Fyear = "";
                       }
                       if (typeof FincomeTouristMin == 'undefined') {
                           FincomeTouristMin = "";
                       }
                       if (typeof FincomeTouristMax == 'undefined') {
                           FincomeTouristMax = "";
                       }
                       if (typeof FarrivalTouristMin == 'undefined') {
                           FarrivalTouristMin = "";
                       }
                       if (typeof FarrivalTouristMax == 'undefined') {
                           FarrivalTouristMax = "";
                       }
                       if (typeof FdepartureTouristMin == 'undefined') {
                           FdepartureTouristMin = "";
                       }
                       if (typeof FdepartureTouristMax == 'undefined') {
                           FdepartureTouristMax = "";
                       }
                       $http.get(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&incomeTouristMax=" + FincomeTouristMax + "&arrivalTourisMin=" + FarrivalTouristMin +
                           "&arrivalTourisMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax).then(function(response) {
                           console.log(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&cincomeTouristMax=" + FincomeTouristMax + "&arrivalTouristMin=" + FarrivalTouristMin +
                               "&arrivalTouristMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax);
                           $scope.touristsByCountries = response.data;

                       });
                   };

                   $scope.sendPost = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
                       if ((typeof country !== 'undefined' &&
                               typeof year !== 'undefined' &&
                               typeof touristDeparture !== 'undefined' &&
                               typeof arrivalTourist !== 'undefined' &&
                               typeof incomeTourist !== 'undefined') || (country !== "" &&
                               year !== "" &&
                               touristDeparture !== "" &&
                               arrivalTourist !== "" &&
                               incomeTourist !== "")) {

                           var data = {
                               country: country,
                               year: parseInt(year),
                               touristDeparture: parseInt(touristDeparture),
                               arrivalTourist: parseInt(arrivalTourist),
                               incomeTourist: parseInt(incomeTourist)
                           };
                           console.log("this is the new data:  " + data);
                           $http.post(API, JSON.stringify(data)).then(function(response) {
                               console.log("post done");
                               $scope.dataResponse = JSON.stringify(response.data, null, 2) + "\n" + "Code: " + response.status;
                               refresh();
                           }, function(response) {
                               console.log("Error POST method: Code " + response.status + ", " + response.statusText);
                               $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                               refresh();
                           });
                       }
                       else {
                           $scope.dataResponse = "Fields required";
                       }

                   };

                   $scope.sendPut = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
                       if ((typeof country !== 'undefined' &&
                               typeof year !== 'undefined' &&
                               typeof touristDeparture !== 'undefined' &&
                               typeof arrivalTourist !== 'undefined' &&
                               typeof incomeTourist !== 'undefined') || (country !== "" &&
                               year !== "" &&
                               touristDeparture !== "" &&
                               arrivalTourist !== "" &&
                               incomeTourist !== "")) {
                           var data = {
                               country: country,
                               year: parseInt(year),
                               touristDeparture: parseInt(touristDeparture),
                               arrivalTourist: parseInt(arrivalTourist),
                               incomeTourist: parseInt(incomeTourist)
                           };
                           console.log("Este es el nuevo dato:  " + data);
                           $http.put(API + "/" + country + "/" + year, JSON.stringify(data)).then(function(response) {
                               console.log("put done");
                               $scope.dataResponse = " Code: " + response.status + "\n" + response.statusText;
                               refresh();
                           }, function(response) {
                               console.log("Error PUT method: Code " + response.status + ", " + response.statusText);
                               $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                               refresh();
                           });
                       }
                       else {
                           $scope.dataResponse = "Fields required";
                       }

                   };





                   $scope.loadInitialData = function() {
                       $http.get(API + "/loadInitialData").then(function(response) {
                           $scope.data = JSON.stringify(response.data, null, 2) + response.status;
                           $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                           refresh();
                       }).catch(function(response) {
                           $scope.data = response.status;
                           $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                           refresh();
                       });

                   };


                   $scope.addCountry = function() {
                       console.log("Adding a new country");
                       var newCountry = $scope.newCountry;

                       $http.post(API, newCountry).then(function(response) {
                           $scope.status = "Status: Registro añadido con éxito";
                           console.log("POST Response " + response.status + "" + response.data);
                           refresh();

                       }, function() {
                           if (newCountry.country == null || newCountry.year == null || newCountry.touristDeparture == null || newCountry.arrivalTourist == null || newCountry.incomeTourist == null) {
                               $scope.status = "Error: No están todos los campos rellenos"
                           }
                           else {
                               $scope.status = "Error: Ya existe el país en el año especificado"
                           }
                       });
                   }

                   $scope.deleteCountry = function(country, year) {
                       $scope.status = "Status: Registro borrado con éxito";
                       console.log("Delete country");

                       $http.delete(API + "/" + country + "/" + year).then(function(response) {
                           console.log("DELETE Response " + response.status + "" + response.data);
                           refresh();

                       });
                   }

                   $scope.sendDeleteAll = function() {
                       $http.delete(API).then(function(response) {
                           console.log("Deleting all data ");
                           var res = JSON.stringify(response.data, null, 2);

                           $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                           $scope.data = response.status;
                           refresh();
                       }, function(response) {
                           $scope.dataResponse = "Code: " + response.status + "\n" + response.statusText;
                           $scope.data = response.status;
                           refresh();
                       });

                   };

                   $scope.limpiar = function() {
                       refresh();
                   };

               }]);
           