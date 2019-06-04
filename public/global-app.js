/*global angular*/

angular.module("app", ["ngRoute","chart.js"])
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
        .when("/integrations/tourist", {

            controller: "HighchartsTourist",
            templateUrl: "tourists/integrations-tourist.html"

        })
        .when("/analytics/geoChartsTourist", {

            controller: "GeoChartsBiofuels",
            templateUrl: "tourists/analytics/geocharts-tourist.html"

        })
         .when("/integrations/ALLtourists-by-countries", {

            controller: "integracionTourist",
            templateUrl: "tourists/analytics/integracionesApi.html"

        })
           .when("/integrations-tourists-by-countries1", {

            controller: "integracionTourist1",
            templateUrl: "tourists/analytics/integracionesApi1.html"

        })
        .when("/integrations/expenses", {

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

      
        .when("/integrations/expenses-e1", {
             controller: "expensesExt1ctrl",
            templateUrl: "expenses/analytics/expenses-E1.html"

        })
        
        .when("/integrations/expenses-02", {
             controller: "expensesG02ctrl",
            templateUrl: "expenses/analytics/expenses-G02.html"

        })
        
        .when("/integrations/emigrations", {

            controller: "HighchartsEmigrations",
            templateUrl: "emigration/analytics/highcharts-emigrantions.html"

        })
        .when("/integrations/expenses-03", {
             controller: "expensesG03ctrl",
            templateUrl: "expenses/analytics/expenses-G03.html"

        })
        
        .when("/integrations/emigrations-expenses08", {

            controller: "integracionExpensesEmi",
            templateUrl: "emigration/analytics/integracionEmigrations-Expenses.html"

        })
        
        .when("/integrations/emigrations-apiExterna1", {

            controller: "apiExterna1Emigration",
            templateUrl: "emigration/analytics/apiExterna1.html"

        })
        
        .when("/integrations/apiExterna2-cristian", {

            controller: "Externa2Cristian",
            templateUrl: "emigration/analytics/ext2.html"

        })
        
        .when("/integrations/population", {

            controller: "integracionPopulationsEmi",
            templateUrl: "emigration/analytics/integracionPopulation.html"

        })
        
        // .when("/integrations/jqEmigrations", {

        //     controller: "jqueryEmigrations",
        //     templateUrl: "emigration/analytics/emigrations-jquery.html"

        // })
        
        
        .when("/integrations/integracionhappines", {

            controller: "integracionhappines",
            templateUrl: "emigration/analytics/integracionEmigrations-happines.html"

        })
        
        .when("/integrations/ejschart", {

            controller: "ejschartctrl",
            templateUrl: "emigration/analytics/ejschart.html"

        })
        
        // .when("/integrations/vis", {

        //     controller: "visctrl",
        //     templateUrl: "emigration/analytics/vis.html"

        // })
        .when("/integrations/expenses-11", {
             controller: "expensesG11ctrl",
            templateUrl: "expenses/analytics/expenses-G11.html"

        })
        
         .when("/integrations/expenses-12", {
             controller: "expensesG12ctrl",
            templateUrl: "expenses/analytics/expenses-G12.html"

        })
        
     .when("/integrations/expenses-E2", {
             controller: "expensesE2ctrl",
            templateUrl: "expenses/analytics/expenses-E2.html"

        })
        .when("/analytics", {
             controller: "analyticsCtrl08",
            templateUrl: "/analytics.html"

        })
        
        
         .when("/integrations/expenses-e3", {
             controller: "expE3ctrl",
            templateUrl: "expenses/analytics/expenses-E3.html"

        })
        .when("/about", {
            templateUrl: "about.html"

        })
        });

  
console.log("angular app ok");
