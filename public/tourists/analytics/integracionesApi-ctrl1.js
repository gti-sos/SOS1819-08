angular
    .module("app")
    .controller("integracionTourist1", ["$scope", "$http",
            function($scope, $http) {
                console.log("integracionTourist1!");


                 
      
 var APIE1 = "/proxyMLS";
 var API = "api/v1/tourists-by-countries";
 

$http.get(API).then(function(response) {     

 $http.get(APIE1).then(function(responseE1) {                  


anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        ['Jan', parseInt(responseE1.data.filter(d => d.region == 'Europe' && d.subregion == "Western Europe").map(function(d) { return d['population'] }))],
        ['Feb', parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d['incomeTourist'] }))],
        ['Mar', parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d['incomeTourist'] }))]
        
    ]);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData = dataSet.mapAs({'x': 0, 'value': 1});

    // create area chart
    var chart = anychart.area();

    // adding dollar symbols to yAxis labels
    chart.yAxis().labels().format('{%Value} hrs');

    // turn on chart animation
    chart.animation(true);

    // axes and scale settings
    chart.yScale()
            .minimum(150)
            .maximum(300);
    chart.yAxis().title('Sunhours');
    chart.xAxis().labels().padding([5, 5, 0, 5]);

    // chart grids
    chart.yGrid(true)
            .xGrid(true);

    // turn on the crosshair
    var crosshair = chart.crosshair();
    crosshair.enabled(true)
            .yStroke(null)
            .xStroke('#fff')
            .zIndex(99);
    crosshair.yLabel(false);
    crosshair.xLabel(false);

    // set chart title text settings
    chart.title()
            .enabled(true)
            .useHtml(true)
            .text('AVERAGE MONTHLY HOURS OF SUNSHINE OVER THE YEAR<br/>' +
                    '<span style="color:#212121; font-size: 13px;">the monthly total of sunhours over the year in Sydney, Australia.</span>')
            .padding([0, 0, 20, 0]);

    // create first series with mapped data
    var series = chart.splineArea(seriesData);
    series.name('Sunhours');
    series.color('Gold 0.5');
    series.markers()
            .enabled(true)
            .type('circle')
            .size(4)
            .stroke('1.5 #fff')
            .zIndex(100);

    // set chart tooltip and interactivity settings
    chart.tooltip()
            .positionMode('chart')
            .anchor('right-top')
            .position('right-top')
            .offsetX(50)
            .offsetY(50);

    chart.interactivity().hoverMode('by-x');

    // set container id for the chart
    chart.container('integracionE2');

    // initiate chart drawing
    chart.draw();
});

   


 })

})

                
}]);