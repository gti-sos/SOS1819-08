           /* global angular $scope*/

           angular
               .module("TouristsApp")
               .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
                   console.log("Tourists Initialized!");


                   var API = "https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries";
                   var path = "https://sos1819-08.herokuapp.com"
                   refresh();


                   function refresh() {
                       console.log("Requesting contacts to <" + API + ">...");
                       $http.get(API + "?limit=" + 10 + "&offset=" + pag).then(function(response) {
                           console.log("Dato recivido: " + JSON.stringify(response.data));
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

               }]);
               