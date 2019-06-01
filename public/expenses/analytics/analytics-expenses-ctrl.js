/* global angular*/
/* global google*/
/* global Highcharts*/
angular.module("app").controller("analyticsExpenses", ["$scope", "$http", function($scope, $http){
    console.log("analytics ctrl initialized");
     var API = "https://sos1819-08.herokuapp.com/api/v1/expenses-of-countries-in-education-and-culture";
     
     $http.get(API).then(function(response) {
                    console.log("Data received: "+ JSON.stringify(response.data));
                    $scope.expenses = response.data;
                
                
                //HIGHCHARTS FOR MY OWN API
                var expensesData=[];
                for (var i in response.data) {
                    if(i==0){
                    var dat={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        y: response.data.map(function(d) { return d["countryExpense"] })[i] ,sliced: true,
            selected: true
                    };}else{
                         dat={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        y: response.data.map(function(d) { return d["countryExpense"] })[i]};
                    };
                    expensesData.push(dat);
                    }
                    
                    
                    console.log("Datos:"+ JSON.stringify(expensesData));
     
                
                
              Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Countries and years',
        colorByPoint: true,
        data: expensesData
    }]
});

//GEOCHARTS
    
            google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyCo1e4ogvTgn7uvbwO6AtnmfVUt_XZVbgs'
      });
      
      var ApiCountriesExpenses=[];
       for (var i in response.data){
           var d =[response.data[i].country, response.data[i].countryExpense];
            ApiCountriesExpenses.push(d);
       }
      
       console.log("DATOS GEOCHART: "+JSON.stringify(ApiCountriesExpenses))
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        ApiCountriesExpenses.unshift(['Country', 'Expenses'])
        var data1=ApiCountriesExpenses;
        var data = google.visualization.arrayToDataTable(data1);
console.log(data1)
        var options = {};
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }

     });      
             
 }] );