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
                var coun=[];
                var cexp=[];
                var bp=[];
                var epc=[];
                for (var i in response.data) {
                    var c=response.data[i].country + " " + response.data[i].year
                    var e=response.data[i].countryExpense
                    var pe=response.data[i].budgetPercentage
                    var cap=response.data[i].expensePerCapita
                    coun.push(c)
                    cexp.push(e)
                    bp.push(pe)
                    epc.push(cap)
                    }
                    
                    
                    console.log( coun);
     
                
                    var colors = Highcharts.getOptions().colors;
Highcharts.chart('container', {

    chart: {
        type: 'streamgraph',
        marginBottom: 30,
        zoomType: 'x'
    },

    // Make sure connected countries have similar colors
    colors: [
        colors[0],
        colors[1],
        colors[2],
        colors[3],
        colors[4],
        // East Germany, West Germany and Germany
        Highcharts.color(colors[5]).brighten(0.2).get(),
        Highcharts.color(colors[5]).brighten(0.1).get(),

        colors[5],
        colors[6],
        colors[7],
        colors[8],
        colors[9],
        colors[0],
        colors[1],
        colors[3],
        // Soviet Union, Russia
        Highcharts.color(colors[2]).brighten(-0.1).get(),
        Highcharts.color(colors[2]).brighten(-0.2).get(),
        Highcharts.color(colors[2]).brighten(-0.3).get()
    ],

    title: {
        floating: true,
        align: 'left',
        text: 'Expenses of countries in education and culture'
    },
   

    xAxis: {
        maxPadding: 0,
        type: 'category',
        crosshair: true,
        categories: coun
            ,
        labels: {
            align: 'left',
            reserveSpace: false,
            rotation: 270
        },
        lineWidth: 0,
        margin: 20,
        tickWidth: 0
    },

    yAxis: {
        visible: false,
        startOnTick: false,
        endOnTick: false
    },

    legend: {
        enabled: false
    },

    annotations: [{
        labels: [{
            point: {
                x: 5.5,
                xAxis: 0,
                y: 30,
                yAxis: 0
            },
            text: 'Cancelled<br>during<br>World War II'
        }, {
            point: {
                x: 18,
                xAxis: 0,
                y: 90,
                yAxis: 0
            },
            text: 'Soviet Union fell,<br>Germany united'
        }],
        labelOptions: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'silver'
        }
    }],

    plotOptions: {
        series: {
            label: {
                minFontSize: 5,
                maxFontSize: 15,
                style: {
                    color: 'rgba(255,255,255,0.75)'
                }
            }
        }
    },

    series: [{
        name: "country expenses",
        data: cexp
    },{
        name: "budget percentage"
        , data: bp
    },{
        name:"expenses per capita"
        , data: epc
    }
        ],

    exporting: {
        sourceWidth: 800,
        sourceHeight: 600
    }

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