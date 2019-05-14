/* global angular $scope*/

angular
    .module("app")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Tourists Initialized!");


        var API = "api/v1/tourists-by-countries/" + $routeParams.country + "/" + $routeParams.year;


     
        $http.get(API).then(function(response) {
            $scope.updatedTourist = response.data;
        });


        $scope.updateTourist = function() {
            $http.put(API, $scope.updatedTourist).then(function(response) {
                $scope.status = "Status: " + response.status;
                
                window.alert("OK: estadistica actualizada");
                $location.path("/#!/tourists-by-countries/");
            }, function() {
                if ($scope.updateTourist["touristDeparture"]== null ||
                    $scope.updateTourist["arrivalTourist"] == null ||
                    $scope.updateTourist["incomeTourist"] == null) {
                    $scope.status = "Error: debe completar todos los campos"
                }
            });
        };


    }]);
