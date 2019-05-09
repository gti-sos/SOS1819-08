            /* global angular $scope*/
        
            angular.module("TouristsApp",["ngRoute"])
            .config(function ($routeProvider){
                $routeProvider
                .when("/",{
                    controller : "ListCtrl",
                    templateUrl: "list.html"
                })
                .when("/:country/:year",{
                    controller : "EditCtrl",
                    templateUrl: "edit.html"
                });
            });
            
            console.log("TouristsByCountriesApp initialized!");