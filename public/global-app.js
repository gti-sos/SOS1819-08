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
                controller: "EditCtrlExpenses", //fallo
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
        
        })
        .when("/analytics/highchartsTourist", {

            controller: "HighchartsTourist",
            templateUrl: "tourists/analytics/highcharts-tourist.html"

        })
        .when("/analytics/geoChartsTourist", {

            controller: "GeoChartsBiofuels",
            templateUrl: "tourists/analytics/geocharts-tourist.html"

        })
         .when("/analytics/integracionG08", {

            controller: "integracionG08",
            templateUrl: "tourists/analytics/integracionG08.html"

        })
        .when("/analytics/expenses", {

            controller: "analyticsExpenses",
            templateUrl: "expenses/analytics/analytics-expenses.html"

        })
         .when("/integrations", {

            templateUrl: "integrations.html"

        }).when("/integrations/expenses-08", {
             controller: "expensesG08ctrl",
            templateUrl: "expenses/analytics/expenses-G08.html"

        }).when("/integrations/expenses-06", {
             controller: "expensesG06ctrl",
            templateUrl: "expenses/analytics/expenses-G06.html"

        })

        });

  
console.log("angular app ok");
