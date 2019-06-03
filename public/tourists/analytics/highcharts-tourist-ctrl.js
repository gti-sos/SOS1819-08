/* global angular */

angular
    .module("app")
    .controller("HighchartsTourist", ["$scope", "$http",
            function($scope, $http) {
                console.log("highcharts inicializado!");

                var API = "api/v1/tourists-by-countries";
                var API2 = "api/v1/emigrations-by-countries";
                var api04 = "https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats";

        //     var mashapePaisEs = {
        //     method: 'GET',
        //     url: "https://restcountries-v1.p.mashape.com/alpha/es",
        //     headers: {
        //         "X-Mashape-Key": "AcgEvL97rJmshaCOKvsl1gQsAywip1HIPLejsnt0pcuMEW5zzk",
        //         "Accept": "application/json"
        //     }
        // };

                $http.get(API).then(function(response) {
                    $http.get(API2).then(function(response1) {
                         $http.get(api04).then(function(response2) {
                        Highcharts.chart('container', {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: 'Datos turisticos por Pais'
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
                                    text: 'Turistas (mil)',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                valueSuffix: ' mil'
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
                                    data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["touristDeparture"] })),
                                        parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d["touristDeparture"] })),
                                        parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d["touristDeparture"] })),
                                        parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["touristDeparture"] })),
                                        parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d["touristDeparture"] }))

                                    ]
                                }, {
                                    name: 'Income Tourist',
                                    data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['incomeTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['incomeTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['incomeTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['incomeTourist'] }))
                                    ]
                                }, {
                                    name: 'arrival Tourist',
                                    data: [parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['arrivalTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'China').map(function(d) { return d['arrivalTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'Colombia').map(function(d) { return d['arrivalTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['arrivalTourist'] })),
                                        parseInt(response.data.filter(d => d.country == 'USA').map(function(d) { return d['arrivalTourist'] }))
                                    ]
                                }, {
                                    name: 'total emigrations',
                                    data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['totalemigrant'] })),
                                        parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['totalemigrant'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['totalemigrant'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['totalemigrant'] })),
                                        parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['totalemigrant'] }))
                                    ]
                                }, {
                                    name: 'emigrant man',
                                    data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['emigrantman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['emigrantman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['emigrantman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['emigrantman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['emigrantman'] }))
                                    ]
                                }, {
                                    name: 'emigrant woman',
                                    data: [parseInt(response1.data.filter(d => d.country == 'Spain').map(function(d) { return d['emigrantwoman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'China').map(function(d) { return d['emigrantwoman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Colombia').map(function(d) { return d['emigrantwoman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'Germany').map(function(d) { return d['emigrantwoman'] })),
                                        parseInt(response1.data.filter(d => d.country == 'USA').map(function(d) { return d['emigrantwoman'] }))
                                    ]
                                }
                                
                                , {
                                    name: 'rating',
                                    data: [parseInt(response2.data.filter(d => d.country == 'France').map(function(d) { return d['rating'] })),
                                        parseInt(response2.data.filter(d => d.country == 'Spain').map(function(d) { return d['rating'] })),
                                        parseInt(response2.data.filter(d => d.country == 'Georgia').map(function(d) { return d['rating'] })),
                                        parseInt(response2.data.filter(d => d.country == 'Germany').map(function(d) { return d['rating'] })),
                                        parseInt(response2.data.filter(d => d.country == 'United States').map(function(d) { return d['rating'] }))
                                    ]
                                }






                            ]

                        });

                    })
})})
                }]);
