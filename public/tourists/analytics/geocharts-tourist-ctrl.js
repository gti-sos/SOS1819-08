/* global angular */

angular
    .module("app")
    .controller("GeoChartsTourist", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "api/v1/tourists-by-countries";
            var tourists = [];

            $http.get(API).then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = [];

                    tourists = response.data;
                    data.push(["Country", "Tourist Departure"]);
                    data.push([tourists[0].country, tourists[0].touristDeparture]);
                    data.push([tourists[2].country, tourists[2].touristDeparture]);
                    data.push([tourists[3].country, tourists[3].touristDeparture]);
                    console.log(data);
                    var plot = google.visualization.arrayToDataTable(data);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(plot, options);
                }
            });
        }
    ]);