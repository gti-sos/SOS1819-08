            /* global angular $scope*/
        
            angular.module("TouristsApp",["ngRoute"])
            .config(function ($routeProvider){
                $routeProvider
                .when("/",{
                    controller : "ListCtrl",
                    templateUrl: "list.html"
                })
                .when("/edit",{
                    controller : "EditCtrl",
                    templateUrl: "edit.html"
                });
            });
            
            console.log("TouristsByCountriesApp initialized!");