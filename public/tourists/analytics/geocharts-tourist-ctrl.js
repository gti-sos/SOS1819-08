/* global angular */

angular
    .module("app")
    .controller("GeoChartsBiofuels", ["$scope","$http", function($scope,$http){

 var API = "api/v1/tourists-by-countries";
 
 
  $http.get(API).then(function(touristsByCountries){
    google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyBHY1cV7da92cIQ7IHqGsQdWQxDzxMQjCg'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable([
        ['Country', 'tourist Departure'],
        ['First grade',     touristsByCountries.data.map(function(d){return parseInt(d["touristDeparture"])}), 1],

        ]);

        var data1 = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['Spain', 200],
          ['United States', 300],
          ['Germany', 400],
          ['China', 500],
          ['Colombia', 600]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
  })
       }]);
