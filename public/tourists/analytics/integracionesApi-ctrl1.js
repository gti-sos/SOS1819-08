angular
    .module("app")
    .controller("integracionTourist1", ["$scope", "$http",
            function($scope, $http) {
                console.log("integracionTourist1!");






 var API = "api/v1/tourists-by-countries";
var API2 = "https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats";

$http.get(API).then(function(response) {
$http.get(API2).then(function(response2) {
               
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("integracion2", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = [{
    "name": "Spain rating",
    "value": parseInt(response2.data.filter(d => d.country == 'Spain').map(function(d) { return d['rating'] }))
}, {
    "name": "Germany rating",
    "value": parseInt(response2.data.filter(d => d.country == 'Germany').map(function(d) { return d['rating'] }))

}, {
    "name": "Spain llegada de turistas",
    "value": parseInt(response.data.filter(d => d.country == 'Spain').map(function(d) { return d["arrivalTourist"] })),
}, {
    "name": "Alemania llegada de turistas",
    "value": parseInt(response.data.filter(d => d.country == 'Germany').map(function(d) { return d["arrivalTourist"] }))

}];

var series = chart.series.push(new am4charts.FunnelSeries());
series.colors.step = 2;
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

series.labelsContainer.paddingLeft = 15;
series.labelsContainer.width = 200;

//series.orientation = "horizontal";
//series.bottomRatio = 1;

chart.legend = new am4charts.Legend();
chart.legend.position = "left";
chart.legend.valign = "bottom";
chart.legend.margin(5,5,20,5);

});

})
})
                
}]);