/*global angular*/

angular.module("minipostmanAPP", ["ngRoute"])
.config(function ($routeProvider){
    $routeProvider.when("/",{
        controller : "ListCtrl",
        templateUrl: "list-expenses.html"
    }).when("/:country/:year",{
         controller : "edit-expenses-ctrl.js",
        templateUrl: "edit-expenses.html"
    });
});
        console.log("angular app ok");