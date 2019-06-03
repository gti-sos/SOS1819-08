angular
    .module("app")
    .controller("integracionExpensesEmi", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionG08!");

            var API = "api/v1/emigrations-by-countries";
            var API2 = "api/v1/expenses-of-countries-in-education-and-culture";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {


                    Highcharts.chart('container', {
                        chart: {
                            type: 'column',
                            options3d: {
                                enabled: true,
                                alpha: 10,
                                beta: 25,
                                depth: 70
                            }
                        },
                        title: {
                            text: '3D chart with null values'
                        },
                        subtitle: {
                            text: 'Notice the difference between a 0 value and a null point'
                        },
                        plotOptions: {
                            column: {
                                depth: 25
                            }
                        },
                        xAxis: {
                            categories: [response.data[0].country + " "+ response.data[0].year, response.data[0].country + " "+ response.data[0].year],
                            labels: {
                                skew3d: true,
                                style: {
                                    fontSize: '16px'
                                }
                            }
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        series: [{
                            name: 'Sales',
                            data: [2, 3]
                        }]
                    });
                })

            })
        }
    ]);