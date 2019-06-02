/* global angular*/
/* global google*/
/* global Highcharts*/
/* global Plottable*/
angular.module("app").controller("analyticsExpenses", ["$scope", "$http", function($scope, $http){
    console.log("analytics ctrler initialized!");
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
       
   var data=[];
  var symbolSize = 10;
  
  for (var i in response.data) {
        
  var  dat2={
                        name: response.data.map(function(d) { return d["country"] })[i]+" "+ response.data.map(function(d) { return d["year"] })[i],
                        expenses: response.data.map(function(d) { return d["countryExpense"] })[i],
   };
                        data.push(dat2);
                    }
                    
  

console.log("Datos para plottable: "+JSON.stringify(data));
    var xScale = new Plottable.Scales.Category();
    var yScale = new Plottable.Scales.Linear();
    var xAxis = new Plottable.Axes.Category(xScale, "bottom");
    var yAxis = new Plottable.Axes.Numeric(yScale, "left");

    var linePlot = new Plottable.Plots.Line()
  .addDataset(new Plottable.Dataset(data))
  .x(function(d) { return d.name; }, xScale)
  .y(function(d) { return d.expenses; }, yScale)
  .attr("stroke-width", 3)
  .attr("stroke", "black")
  .addDataset(new Plottable.Dataset(data));

    var scatterPlot = new Plottable.Plots.Scatter()
  .addDataset(new Plottable.Dataset(data))
  .x(function(d) { return d.name; }, xScale)
  .y(function(d) { return d.expenses; }, yScale)
  .attr("opacity", 1)
  .attr("stroke-width", 3)
  .attr("stroke", "black")
  .size(symbolSize)
  .addDataset(new Plottable.Dataset(data));
  
  
  var bandPlot = new Plottable.Plots.Rectangle()
  .x(function(d) { return d.name; }, xScale)
  .y(0)
  .y2(function() { return bandPlot.height(); })
  .attr("fill", "white")
  .attr("opacity", 0.3)
  .addDataset(new Plottable.Dataset(data));

var interaction = new Plottable.Interactions.Pointer();
interaction.onPointerMove(function(point) {
  bandPlot.entities().forEach(function(entity) {
    entity.selection.attr("fill", "white");
  });
  var nearestEntity = bandPlot.entityNearest(point);
  nearestEntity.selection.attr("fill", "#7cb5ec");
  scatterPlot.size(function(datum) {
    return datum.ages === nearestEntity.datum.name ? symbolSize * 2 : symbolSize;
  });
})
interaction.onPointerExit(function() {
  bandPlot.entities().forEach(function(entity) {
    entity.selection.attr("fill", "white");
  });
  scatterPlot.size(symbolSize);
});
interaction.attachTo(bandPlot);
   

var plots = new Plottable.Components.Group([bandPlot, linePlot, scatterPlot]);

var table = new Plottable.Components.Table([
  [yAxis, plots],
  [null,  xAxis]
]);

table.renderTo("div#example");




     });      
             
 }] );