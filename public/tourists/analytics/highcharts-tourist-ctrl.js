/* global angular */

angular
    .module("app")
    .controller("HighchartsTourist", ["$scope", "$http",
        function($scope, $http) {
        console.log("highcharts inicializado!");
           
            var API = "api/v1/tourists-by-countries";
         


            $http.get(API).then(function(response) {
                Highcharts.chart('container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Historic World Population by Region'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Spain', 'China', 'Colombia', 'Germany', 'USA'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Population (millions)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                            name: 'Tourists Departure',
                            data: [parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['touristDeparture'] })),
                                parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['touristDeparture'] })),
                                parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['touristDeparture'] })),
                                parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['touristDeparture'] })),
                                parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['touristDeparture'] }))
                            ]
                        }, {
                            name: 'Income Tourist',
                            data: [parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['incomeTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['incomeTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['incomeTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['incomeTourist'] }))
                            ]
                        }, {
                            name: 'arrival Tourist',
                            data: [parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['arrivalTourist'] })),
                                parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['arrivalTourist'] }))
                            ]
                        }






                    ]

                });

            })

        }
    ]);
