/* global angular */

angular
    .module("app")
    .controller("HighchartsTourist", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "api/v1/tourists-by-countries";
            var tourists = [];
            
            
        $http.get(API).then(function(response) {
        Highcharts.chart('turistsbycountries', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'turists by countries'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Spain', 'China', 'Colombia', 'Germany', 'USA'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'turistas por pais'

                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: 'turistas por pais'
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        }
                    },  


    
                    series: [{
                        name: 'China touristDeparture',
                        data: response.data.filter(d => d.country == 'China').map(function(d){return d['touristDeparture']})

                    },{
                        name: 'Spain touristDeparture',
                        data: response.data.filter(d => d.country == 'Spain').map(function(d){return d['touristDeparture']})

                    },{
                        name: 'Colombia touristDeparture',
                        data: response.data.filter(d => d.country == 'Colombia').map(function(d){return d['touristDeparture']})

                    },{
                        name: 'Germany touristDeparture',
                        data: response.data.filter(d => d.country == 'Germany').map(function(d){return d['touristDeparture']})

                    },{
                        name: 'USA touristDeparture',
                        data: response.data.filter(d => d.country == 'USA').map(function(d){return d['touristDeparture']})

                    },{
                        name: 'China arrivalTourist',
                        data: response.data.filter(d => d.country == 'China').map(function(d){return d['arrivalTourist']})

                    },{
                        name: 'Spain arrivalTourist',
                        data: response.data.filter(d => d.country == 'Spain').map(function(d){return d['arrivalTourist']})

                    },{
                        name: 'Colombia arrivalTourist',
                        data: response.data.filter(d => d.country == 'Colombia').map(function(d){return d['arrivalTourist']})

                    },{
                        name: 'Germany arrivalTourist',
                        data: response.data.filter(d => d.country == 'Germany').map(function(d){return d['arrivalTourist']})

                    },{
                        name: 'USA arrivalTourist',
                        data: response.data.filter(d => d.country == 'USA').map(function(d){return d['arrivalTourist']})

                    },{
                        name: 'China incomeTourist',
                        data: response.data.filter(d => d.country == 'China').map(function(d){return d['incomeTourist']})

                    },{
                        name: 'Spain incomeTourist',
                        data: response.data.filter(d => d.country == 'Spain').map(function(d){return d['incomeTourist']})

                    },{
                        name: 'Colombia incomeTourist',
                        data: response.data.filter(d => d.country == 'Colombia').map(function(d){return d['incomeTourist']})

                    },{
                        name: 'Germany incomeTourist',
                        data: response.data.filter(d => d.country == 'Germany').map(function(d){return d['incomeTourist']})

                    },{
                        name: 'USA incomeTourist',
                        data: response.data.filter(d => d.country == 'USA').map(function(d){return d['incomeTourist']})

                    }
                    ]
                });



            });
        }
    ]);