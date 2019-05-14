/*global angular*/

angular.module("app", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "info.html"
    }).when("/expenses-of-countries-in-education-and-culture",{
        controller : "ListCtrl-expenses",
        templateUrl: "expenses/list-expenses.html"
    })
    
    
    .when("/expenses-of-countries-in-education-and-culture/:country/:year",{
         controller : "EditCtrl",
        templateUrl: "expenses/edit-expenses.html"
    });
});
        console.log("angular app ok");