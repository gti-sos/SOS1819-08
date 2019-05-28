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
                google.charts.setOnLoadCallback(drawMarkersMap);
                /*console.log("variables :" + response.data.filter(d => d.province == "huelva" && d.year == 2016).map(d => { return d.year }));*/

                function drawMarkersMap() {
          var data1 = google.visualization.arrayToDataTable([
    
        ['touristDeparture', 'country'],
        [   'Germany' ,parseInt(response.data.filter(d =>d.country == 'Germany' && d.year == 2017).map(d => { return d['touristDeparture']}))],
        [   'United States' ,parseInt(response.data.filter(d =>d.country == 'USA' && d.year == 2017).map(d => { return d['touristDeparture']}))],
        [   'Spain' ,parseInt(response.data.filter(d =>d.country == 'Spain' && d.year == 2017).map(d => { return d['touristDeparture']}))],
        [   'China' ,parseInt(response.data.filter(d =>d.country == 'China' && d.year == 2017).map(d => { return d['touristDeparture']}))],
        [   'Colombia' ,parseInt(response.data.filter(d =>d.country == 'Colombia' && d.year == 2017).map(d => { return d['touristDeparture']}))]
   
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data1, options);
      }
  })
       }]);
