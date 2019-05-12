/*global angular*/

angular.module("minipostmanAPP", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/list",{
        controller : "ListCtrl",
        templateUrl: "list-expenses.html"
    })
});
        console.log("angular app ok");