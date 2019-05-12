/*global angular*/

angular.module("minipostmanAPP", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/",{
        controller : "ListCtrl",
        templateUrl: "list-expenses.html"
    }).when("/:country/:year",{
         controller : "EditCtrl",
        templateUrl: "edit-expenses.html"
    });
});
        console.log("angular app ok");