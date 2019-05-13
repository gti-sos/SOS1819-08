angular
    .module("emigrationsApp",["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
            .when("/",{
                controller : "ListCtrl",
                templateUrl: "list.html"
            })
           .when("/edit/:country/:year",{
                controller : "EditCtrl",
                templateUrl: "edit.html"
            });
    });

