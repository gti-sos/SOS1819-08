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
                        type: 'area'
                    },
                    title: {
                        text: 'US and USSR nuclear stockpiles'
                    },
                    subtitle: {
                        text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
                            'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
                            'armscontrol.org</a>'
                    },
                    xAxis: {
                        allowDecimals: false,
                        labels: {
                            formatter: function() {
                                return this.value; // clean, unformatted number for year
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Nuclear weapon states'
                        },
                        labels: {
                            formatter: function() {
                                return this.value / 1000 + 'k';
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                    },
                    plotOptions: {
                        area: {
                            pointStart: 1940,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
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
                    }]
                });
            })
        }
    ]);
