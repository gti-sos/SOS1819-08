/* global angular */
/* global Highcharts */
/* global google*/

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
                        text: 'Emigrations-by-Countries'
                    },
                    subtitle: {
                        text: '',
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
                        categories: ['Spain 2017', 'China 2017', 'Colombia 2017', 'Germany 2017', 'USA 2017']
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
                    }]
                });
            })
        }
    ]);

google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyAfgHk-QxAEOnOv40ZUlDjMNie-yRyLhIc'
});
var ApiCountriesEmigration = [];
for (var i in response.data) {
    var c = response.data[i].country
    if (c == 'USA') {
        c = "United States"
    }
    var d = [c, response.data[i].totalemigrant];
    ApiCountriesEmigration.push(d);
}

console.log("DATOS GEOCHART: " + JSON.stringify(ApiCountriesEmigration))
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
        ApiCountriesEmigration.unshift(['country', 'totalemigrant'])
        var data1=ApiCountriesEmigration;
        var data = google.visualization.arrayToDataTable(data1);
console.log(data1)

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}
