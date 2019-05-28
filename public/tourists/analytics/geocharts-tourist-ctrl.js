/* global angular */

 
angular
    .module("app")
    .controller("GeoChartsBiofuels", ["$scope","$http", function($scope,$http){

 var API = "api/v1/tourists-by-countries";
 
 
  $http.get(API).then(function(response){
    google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyBHY1cV7da92cIQ7IHqGsQdWQxDzxMQjCg'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
          var data1 = google.visualization.arrayToDataTable([
    
        ['año', 'touristDeparture', 'country'],
         ['2017', parseInt(response.data.filter(d =>d.year == 2017).map(d => { return d['touristDeparture'] })),
                            response.data.filter( d =>d.year == 2017).map(d => { return d.country })],
        

        ]);

        var options = {displayMode: 'markers',
                        colorAxis: { colors: ['green', 'red'] }};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data1, options);
      }
  })
       }]);
