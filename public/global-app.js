/*global angular*/

angular.module("minipostmanAPP", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "index.html"
    }).when("/expenses",{
        controller : "ListCtrl",
        templateUrl: "expenses/list-expenses.html"
    })
    
    
    .when("/:country/:year",{
         controller : "EditCtrl",
        templateUrl: "expenses/edit-expenses.html"
    });
});
        console.log("angular app ok");