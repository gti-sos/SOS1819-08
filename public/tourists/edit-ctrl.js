/* global angular $scope*/

angular
    .module("TouristsApp")
    .controller("EditCtrl", ["$scope", "$http","$routeParams","$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Tourists Initialized!");


        var API = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries/"+$routeParams.country+"/"+$routeParams.year;
        var path = "https://sos1819-08.herokuapp.com"
        refresh();


        function refresh() {
            console.log("Requesting contacts to <" + API + ">...");
            $http.get(API + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                console.log("Dato recivido: " + JSON.stringify(response.data));
                $scope.touristsByCountries = response.data;

            });
        };


        $http.get(API).then(function (response){
            $scope.sendPut= response.data;
        });


                $scope.sendPut = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
            if (typeof country !== 'undefined' &&
                typeof year !== 'undefined' &&
                typeof touristDeparture !== 'undefined' &&
                typeof arrivalTourist !== 'undefined' &&
                typeof incomeTourist !== 'undefined') {

                var data = {
                    country: country,
                    year: parseInt(year),
                    touristDeparture: parseInt(touristDeparture),
                    arrivalTourist: parseInt(arrivalTourist),
                    incomeTourist: parseInt(incomeTourist)
                };

                console.log("Este es el nuevo dato:  " + data);
                $http.put(API , JSON.stringify(data)).then(function(response) {
                    console.log("put done");
                    $scope.dataResponse = " Código: " + response.status + "\n" + response.statusText + " Dato modificado";
                    refresh();
                }, function(response) {
                    console.log("Error método PUT: Código" + response.status + ", " + response.statusText);
                    $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText + "Dato no ha sido modificado";
                    refresh();
                });
            }
            else {
                $scope.dataResponse = "Datos incompletos";
            }
};



        $scope.sendPost = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
            if (typeof country !== 'undefined' &&
                typeof year !== 'undefined' &&
                typeof touristDeparture !== 'undefined' &&
                typeof arrivalTourist !== 'undefined' &&
                typeof incomeTourist !== 'undefined') {

                var data = {
                    country: country,
                    year: parseInt(year),
                    touristDeparture: parseInt(touristDeparture),
                    arrivalTourist: parseInt(arrivalTourist),
                    incomeTourist: parseInt(incomeTourist)
                };
                console.log("Este es el nuevo dato:  " + data);
                $http.post(API, JSON.stringify(data)).then(function(response) {
                    console.log("post done");
                    $scope.dataResponse = JSON.stringify(response.data, null, 2) + "\n" + "Código: " + response.status + ". Dato creado";
                    refresh();
                }, function(response) {
                    console.log("Error método POST: Código " + response.status + ", " + response.statusText);
                    $scope.dataResponse = "Código: " + response.status + "\n" + "El Dato no ha sido creado";
                    refresh();
                });
            }
            else {
                $scope.dataResponse = "Dato incompleto";
            }

        };




        


        $scope.loadInitialData = function() {
            $http.get(API + "/loadInitialData").then(function(response) {
                $scope.data = JSON.stringify(response.data, null, 2) + response.status;
                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText + "Datos iniciados de nuevo";
                refresh();
            }).catch(function(response) {
                $scope.data = response.status;
                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
                refresh();
            });

        };


        $scope.sendDelete = function(country, year) {
            $http.delete(API + "/" + country + "/" + year).then(function(response) {
                console.log("Deleting data :" + country + " " + year);
                var res = JSON.stringify(response.data, null, 2);

                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
                $scope.data = "creado: " + response.status;
                refresh();
            }, function(response) {
                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
                $scope.data = response.status;
                refresh();
            });

        };



        $scope.sendDeleteAll = function() {
            $http.delete(API).then(function(response) {
                console.log("Deleting all data ");
                var res = JSON.stringify(response.data, null, 2);

                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
                $scope.data = response.status;
                refresh();
            }, function(response) {
                $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
                $scope.data = response.status;
                refresh();
            });

        };

        $scope.limpiar = function() {
            refresh();
        };


        //   $scope.postJson = function() {
        //       $http.post(path + $scope.url, $scope.data).then(function(response) {
        //           $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
        //           $scope.data = response.status;
        //       }, function(response) {
        //           $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
        //           $scope.data = response.status;
        //       });
        //   };
        //   $scope.putJson = function() {
        //       $http.put(path + $scope.url, $scope.data).then(function(response) {
        //           $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
        //           $scope.data = response.status;
        //       }, function(response) {
        //           $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText;
        //           $scope.data = response.status
        //       });
        //   };




        var pag = 0;
        var numero;
        $scope.Pagination = function(Fcountry, Fyear, FincomeTouristMin, FincomeTouristMax, FarrivalTouristMin, FarrivalTouristMax, FdepartureTouristMin, FdepartureTouristMax, num) {
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

            if (num == 1) {
                pag = pag - 10;
                if (pag < 0) {
                    pag = 0;
                    $http.get(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&incomeTouristMax=" + FincomeTouristMax + "&arrivalTourisMin=" + FarrivalTouristMin +
                        "&arrivalTourisMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag).then(function(response) {
                        console.log("pagina1");
                        console.log(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&cincomeTouristMax=" + FincomeTouristMax + "&arrivalTouristMin=" + FarrivalTouristMin +
                            "&arrivalTouristMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag);
                        numero = num;
                        console.log(numero);
                        refresh();
                    });

                }
                else {

                    $http.get(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&incomeTouristMax=" + FincomeTouristMax + "&arrivalTourisMin=" + FarrivalTouristMin +
                        "&arrivalTourisMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag).then(function(response) {
                        console.log("pagina2");
                        console.log(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&cincomeTouristMax=" + FincomeTouristMax + "&arrivalTouristMin=" + FarrivalTouristMin +
                            "&arrivalTouristMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag);
                        numero = num;
                        console.log(numero);
                        refresh();
                    });

                }
            }
            else {

                pag = pag + 10;
                $http.get(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&incomeTouristMax=" + FincomeTouristMax + "&arrivalTourisMin=" + FarrivalTouristMin +
                    "&arrivalTourisMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag).then(function(response) {
                    console.log("pagina3");
                    console.log(API + "?country=" + Fcountry + "&year=" + Fyear + "&incomeTouristMin=" + FincomeTouristMin + "&cincomeTouristMax=" + FincomeTouristMax + "&arrivalTouristMin=" + FarrivalTouristMin +
                        "&arrivalTouristMax=" + FarrivalTouristMax + "&departureTouristMin=" + FdepartureTouristMin + "&departureTouristMax=" + FdepartureTouristMax + "&limit=" + 10 + "&offset=" + pag);
                    numero = num;
                    console.log(numero);
                    refresh();

                });


            }
        }

        refresh();


    }]);
