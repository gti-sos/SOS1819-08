angular
    .module("app")
    .controller("integracionExpensesEmi", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionExpenses");

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
                            categories: [response.data[0].country + " "+ response.data[0].year,
                            response.data[1].country + " "+ response.data[1].year,
                            response.data[2].country + " "+ response.data[2].year,
                            response.data[3].country + " "+ response.data[3].year,
                            response.data[4].country + " "+ response.data[4].year],
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
                            name: 'Emigrant Man',
                            data: [parseInt(response.data.filter(d => d.country == response.data[0].country).map(function(d) { return d["totalemigrant"] })),
                                parseInt(response.data.filter(d => d.country == response.data[1].country).map(function(d) { return d["totalemigrant"] })),
                                parseInt(response.data.filter(d => d.country == response.data[2].country).map(function(d) { return d["totalemigrant"] })),
                                parseInt(response.data.filter(d => d.country == response.data[3].country).map(function(d) { return d["totalemigrant"] })),
                                parseInt(response.data.filter(d => d.country == response.data[4].country).map(function(d) { return d["totalemigrant"] }))
                        ]
                    }, {
                        name: 'ExpensePerCapita',
                        data: [parseInt(response1.data.filter(d => d.country == response1.data[0].country).map(function(d) { return d["expensePerCapita"] })),
                            parseInt(response1.data.filter(d => d.country == response1.data[1].country).map(function(d) { return d["expensePerCapita"] })),
                            parseInt(response1.data.filter(d => d.country == response1.data[2].country).map(function(d) { return d["expensePerCapita"] })),
                            parseInt(response1.data.filter(d => d.country == response1.data[3].country).map(function(d) { return d["expensePerCapita"] })),
                            parseInt(response1.data.filter(d => d.country == response1.data[4].country).map(function(d) { return d["expensePerCapita"] }))
                        ]
                    }]
                    });
                })

            })
        }
    ]);