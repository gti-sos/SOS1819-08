angular
    .module("app")
    .controller("visctrl",["$scope","$http", function ($scope,$http){
        console.log("ejschartctrl Initialized.");
        var API = "/api/v1/emigrations-by-countries";
 var container = document.getElementById('visualization');
  var items = [
    {x: '2014-06-11', y: 10},
    {x: '2014-06-12', y: 25},
    {x: '2014-06-13', y: 30},
    {x: '2014-06-14', y: 10},
    {x: '2014-06-15', y: 15},
    {x: '2014-06-16', y: 30}
  ];

  var dataset = new vis.DataSet(items);
var options = {
    dataAxis: {
        left: {
            range: {min:-5, max:30}
        },
        right: {
            range: {min:-5}
        }
    }
};
  var graph2d = new vis.Graph2d(container, dataset, options);
    


    
}]);