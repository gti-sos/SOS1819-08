/* global angular $scope*/

angular
    .module("TouristsApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Tourists Initialized!");


        var API = "/api/v1/tourists-by-countries/" + $routeParams.country + "/" + $routeParams.year;


        ///La variable put se pone a true para señalar que lo que vamos a hacer es actualizar la base de datos, es decir, hacer un put    
        $http.get(API).then(function(response) {
            $scope.updateTourist = response.data;
        });


        $scope.updateTourist = function() {
            $http.put(API, $scope.updateTourist).then(function(response) {
                $scope.status = "Status: " + response.status;
                
                window.alert("OK: estadistica actualizada");
                $location.path("/tourists-by-countries");
            }, function() {
                if ($scope.updateTourist["touristDeparture"]== null ||
                    $scope.updateTourist["arrivalTourist"] == null ||
                    $scope.updateTourist["incomeTourist"] == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        };






        //     $scope.sendPut = function(country, year, touristDeparture, arrivalTourist, incomeTourist) {
        // if (typeof country !== 'undefined' &&
        //     typeof year !== 'undefined' &&
        //     typeof touristDeparture !== 'undefined' &&
        //     typeof arrivalTourist !== 'undefined' &&
        //     typeof incomeTourist !== 'undefined') {

        //     var data = {
        //         country: country,
        //         year: parseInt(year),
        //         touristDeparture: parseInt(touristDeparture),
        //         arrivalTourist: parseInt(arrivalTourist),
        //         incomeTourist: parseInt(incomeTourist)
        //     };





        //     console.log("Este es el nuevo dato:  " + data);
        //     $http.put(API , JSON.stringify(data)).then(function(response) {
        //         console.log("put done");
        //         $scope.dataResponse = " Código: " + response.status + "\n" + response.statusText + " Dato modificado";
        //         refresh();
        //     }, function(response) {
        //         console.log("Error método PUT: Código" + response.status + ", " + response.statusText);
        //         $scope.dataResponse = "Código: " + response.status + "\n" + response.statusText + "Dato no ha sido modificado";
        //         refresh();
        //     });
        // }
        // else {
        //     $scope.dataResponse = "Datos incompletos";
        // }



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
