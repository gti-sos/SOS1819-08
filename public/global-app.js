/*global angular*/

angular.module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider.when("/", {
                templateUrl: "info.html"
            }).when("/expenses-of-countries-in-education-and-culture", {
                controller: "ListCtrl-expenses",
                templateUrl: "expenses/list-expenses.html"
            })


            .when("/expenses-of-countries-in-education-and-culture/:country/:year", {
                controller: "EditCtrl-expense",
                templateUrl: "expenses/edit-expenses.html"
            })

            .when("/emigrations-by-countries", {
                controller: "ListCtrlEmigration",
                templateUrl: "emigration/emigrationapp/list.html"
            })

            .when("/emigrations-by-countries/:country/:year", {
                controller: "EditCtrlEmigration",
                templateUrl: "emigration/emigrationapp/edit.html"
            })

        .when("/tourists-by-countries", {
            controller: "ListCtrl",
            templateUrl: "tourists/list.html"
        })
        .when("/tourists-by-countries/:country/:year", {
            controller: "EditCtrl",
            templateUrl: "tourists/edit.html"
        });


    });
console.log("angular app ok");
