/*global angular*/

angular.module("minipostmanAPP", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/ui/v1/expenses-of-countries-in-education-and-culture",{
        controller : "ListCtrl",
        templateUrl: "list-expenses.html"
    })
});
        console.log("angular app ok");