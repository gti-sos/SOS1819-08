/* global angular */
/* global Highcharts */

angular
    .module("app")
    .controller("HighchartsEmigrations", ["$scope", "$http",
            function($scope, $http) {
                console.log("highcharts inicializado!");

                var API = "api/v1/emigrations-by-countries";

                $http.get(API).then(function(response) {
                    Highcharts.chart('container', {
                        chart: {
                            type: 'area',
                            spacingBottom: 30
                        },
                        title: {
                            text: 'Fruit consumption *'
                        },
                        subtitle: {
                            text: '* Jane\'s banana consumption is unknown',
                            floating: true,
                            align: 'right',
                            verticalAlign: 'bottom',
                            y: 15
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            verticalAlign: 'top',
                            x: 100,
                            y: 70,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                        },
                        xAxis: {
                            categories: ['Spain 2017', 'China 2017', 'Colombia', 'Germany', 'USA']
                        },
                        yAxis: {
                            title: {
                                text: 'Y-Axis'
                            },
                            labels: {
                                formatter: function() {
                                    return this.value;
                                }
                            }
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    this.x + ': ' + this.y;
                            }
                        },
                        plotOptions: {
                            area: {
                                fillOpacity: 0.5
                            }
                        },
                        credits: {
                            enabled: false
                        },
                    series: [{
                        name: 'Total Emigrant',
                        data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["totalemigrant"] })),
                            parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d["totalemigrant"] })),
                            parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d["totalemigrant"] })),
                            parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["totalemigrant"] })),
                            parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d["totalemigrant"] }))
                        ]
                    }, {
                        name: 'Emigrant Man',
                        data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["emigrantman"] })),
                            parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d["emigrantman"] })),
                            parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d["emigrantman"] })),
                            parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["emigrantman"] })),
                            parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d["emigrantman"] }))
                        ]
                    }
                    ]
                });
            })
    }
]);
