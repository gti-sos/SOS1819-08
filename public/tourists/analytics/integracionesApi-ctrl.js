angular
    .module("app")
    .controller("integracionTourist", ["$scope", "$http",
        function($scope, $http) {
            console.log("integracionTourist!");

            var API = "api/v1/tourists-by-countries";
            var API2 = "api/v1/emigrations-by-countries";



            $http.get(API).then(function(response) {
                $http.get(API2).then(function(response1) {

              Highcharts.chart('integracion1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Column chart with negative values'
    },
    xAxis: {
        categories: ['Spain', 'China', 'Colombia', 'Germany', 'USA']
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
                        }]
                    });
                })

            })
        }
    ]);
