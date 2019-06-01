/* global angular*/
/* global google*/
/* global Highcharts*/
/* global Plottable*/
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
           var c=response.data[i].country
           if(c=='USA'){
               c="United States"
           }
           var d =[c, response.data[i].countryExpense];
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
      
      
      //PLOTTABLE
      
      function generateData() {
  var data=[];
  var val= 500;
  for (var i in response.data) {
   var dat={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        expenses: response.data.map(function(d) { return d["countryExpense"] })[i],
                        epc: response.data.map(function(d) { return d["expensePerCapita"] })[i],
                        value:  + data[data.length - 1].value + Math.random()
   }
                        data.push(dat);
                    }
  
  return data;
}

console.log("Datos para plottable: "+JSON.stringify(generateData()));

function generatePlotGroup(xScale, yScale) {
  var linePlot = new Plottable.Plots.Line()
    .addDataset(new Plottable.Dataset(generateData()))
    .addDataset(new Plottable.Dataset(generateData()))
    .x(function(d) { return d.name; }, xScale)
    .y(function(d) { return d.value; }, yScale)
    .attr("opacity", 0.9);

  var datasetForFocusPoint = new Plottable.Dataset();

  var selectedPoint = new Plottable.Plots.Scatter()
    .x(function(d) { return d.date; }, xScale)
    .y(function(d) { return d.value; }, yScale)
    .size(10)
    .attr("opacity", 1)
    .addDataset(datasetForFocusPoint);

  var selectedPointHighlight = new Plottable.Plots.Scatter()
    .x(function(d) { return d.date; }, xScale)
    .y(function(d) { return d.value; }, yScale)
    .size(20)
    .attr("opacity", 0.25)
    .addDataset(datasetForFocusPoint);

  var guideline = new Plottable.Components.GuideLineLayer(
    Plottable.Components.GuideLineLayer.ORIENTATION_VERTICAL
  ).scale(xScale);

  return new Plottable.Components.Group([linePlot, guideline, selectedPoint, selectedPointHighlight]);
}




   

     });      
             
 }] );